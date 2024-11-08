import cv2
import mediapipe as mp
import math

# Initialize MediaPipe Hands and Drawing modules
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Open a connection to the external camera
webcam = cv2.VideoCapture(0)
if not webcam.isOpened():
    print("Error: Could not open external camera.")
    exit()

# Function to calculate angle between three points
def calculate_angle(a, b, c):
    ang = math.degrees(math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(a[1] - b[1], a[0] - b[0]))
    return abs(ang)

# Define finger landmarks
finger_landmarks = {
    "Thumb": [1, 2, 3, 4],
    "Index": [5, 6, 7, 8],
    "Middle": [9, 10, 11, 12],
    "Ring": [13, 14, 15, 16],
    "Pinky": [17, 18, 19, 20]
}

# Threshold and smoothing parameters
side_threshold = 0.05  # Adjust for sensitivity of "Left" and "Right"
smoothing_factor = 0.1
last_wrist_x = None

# Initialize hand tracking model
with mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.6) as hands:
    while webcam.isOpened():
        success, img = webcam.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        # Convert image color from BGR to RGB for MediaPipe processing
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)

        # Detect hand landmarks
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # Draw hand landmarks on the original BGR image
                mp_drawing.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                # Extract key landmarks (store coordinates as dict for easy access)
                landmarks = {i: (lm.x, lm.y, lm.z) for i, lm in enumerate(hand_landmarks.landmark)}
                wrist_x = landmarks[0][0]  # x-coordinate of wrist
                palm_center_x = landmarks[9][0]  # x-coordinate of index MCP as palm center

                # Smooth wrist side movement (Left/Right) using exponential moving average
                if last_wrist_x is None:
                    last_wrist_x = wrist_x
                smoothed_wrist_x = smoothing_factor * wrist_x + (1 - smoothing_factor) * last_wrist_x
                last_wrist_x = smoothed_wrist_x

                # Determine wrist movement Left or Right (X-axis)
                if smoothed_wrist_x < palm_center_x - side_threshold:
                    wrist_position_side = "Wrist Moving Left"
                elif smoothed_wrist_x > palm_center_x + side_threshold:
                    wrist_position_side = "Wrist Moving Right"
                else:
                    wrist_position_side = "Wrist Centered"

                # Display wrist side movement information
                cv2.putText(img, wrist_position_side, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

                # Process each finger for position, bend, and direction
                finger_info = []
                for finger_name, points in finger_landmarks.items():
                    mcp = landmarks[points[0]]
                    pip = landmarks[points[1]]
                    dip = landmarks[points[2]]
                    tip = landmarks[points[3]]

                    # Determine position, bend, and direction
                    position = "Up" if tip[1] < mcp[1] else "Down"
                    bend_state = "Bent" if calculate_angle(mcp, pip, dip) < 160 else "Straight"
                    direction = "Left" if tip[0] < landmarks[0][0] else "Right"

                    # Collect information for display
                    finger_info.append(f"{finger_name}: {position}, {bend_state}, {direction}")

                # Display finger information on screen
                for i, info in enumerate(finger_info):
                    cv2.putText(img, info, (10, 40 + i * 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

        # Display the image
        cv2.imshow('AQUALIX', img)

        # Break the loop when 'q' is pressed
        if cv2.waitKey(5) & 0xFF == ord("q"):
            break

# Release the webcam and close all OpenCV windows
webcam.release()
cv2.destroyAllWindows()
