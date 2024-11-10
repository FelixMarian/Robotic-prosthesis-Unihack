import cv2
import mediapipe as mp
import math
import time
from adafruit_servokit import ServoKit
import socket
import threading
 
kit = ServoKit(channels=16)
 
servos = {
    "Thumb": kit.servo[2],
    "Index": kit.servo[1],
    "Middle": kit.servo[3],
    "Ring": kit.servo[0],
    #     "IndexRight": kit.servo[4],   # Additional servo for Index (15° to the right)
    # "RingLeft": kit.servo[5],     # Additional servo for Ring (15° to the left)
    # "ThumbRight": kit.servo[6],   # Additional servo for Thumb (15° to the right)
    # "ThumbLeft": kit.servo[7],
 
    }
 
def lockServos():
    global is_locked
    global last_positions
    print("Locking servos...")
    is_locked = True
    # Store current positions when locking
    last_positions["Thumb"] = servos["Thumb"].angle
    last_positions["Index"] = servos["Index"].angle
    last_positions["Middle"] = servos["Middle"].angle
    last_positions["Ring"] = servos["Ring"].angle
    print(f"Locked at: {last_positions}")
def unlockServos():
    global is_locked
    print("Unlocking servos...")
    is_locked = False  
 
# Function used for listening to new messages from website into a new thread
def readData():
    # Initiate the socket to listen on port 5000
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('0.0.0.0',5000))
 
 
    while True:
        # Read new messages via TCP 
        server_socket.listen(1)
        connection, client_address = server_socket.accept() 
        data = connection.recv(1024)
        print(f"Mesaj primit: {data.decode('utf-8')}") 
        messageDec = data.decode('utf-8')
        if messageDec == "P1":
            servos["Thumb"].angle = 0  # Thumb extended (0 degrees)
            servos["Index"].angle = 180  # Index curled (90 degrees)
            servos["Middle"].angle = 180 # Middle curled (90 degrees)
            servos["Ring"].angle = 180 
        elif messageDec == "P2":
            servos["Thumb"].angle = 180 # Thumb extended (0 degrees)
            servos["Index"].angle = 0  # Index curled (90 degrees)
            servos["Middle"].angle = 0  # Middle curled (90 degrees)
            servos["Ring"].angle = 180   
        elif messageDec == "P3":
            servos["Thumb"].angle = 180 # Thumb extended (0 degrees)
            servos["Index"].angle = 180  # Index curled (90 degrees)
            servos["Middle"].angle = 180  # Middle curled (90 degrees)
            servos["Ring"].angle = 180  
        elif messageDec == "P4":
            servos["Thumb"].angle = 0 # Thumb extended (0 degrees)
            servos["Index"].angle = 0  # Index curled (90 degrees)
            servos["Middle"].angle = 0  # Middle curled (90 degrees)
            servos["Ring"].angle = 0  
        elif messageDec == "LO":
            lockServos()
        elif messageDec == "UL":
            unlockServos()
 
is_locked = False
last_positions = {
    "Thumb": 0,
    "Index": 0,
    "Middle": 0,
    "Ring": 0
}
 
 
def prostheticHand():
        # Initialize the ServoKit for 16-channel PCA9685
    #kit = ServoKit(channels=16)
 
    # Control servo on channels for each finger (example: channels 1-4 for thumb, index, middle, and ring)
    #servos = {
     #   "Thumb": kit.servo[2],
      #  "Index": kit.servo[1],
       # "Middle": kit.servo[3],
        #"Ring": kit.servo[0],
    #     "IndexRight": kit.servo[4],   # Additional servo for Index (15° to the right)
    # "RingLeft": kit.servo[5],     # Additional servo for Ring (15° to the left)
    # "ThumbRight": kit.servo[6],   # Additional servo for Thumb (15° to the right)
    # "ThumbLeft": kit.servo[7],
    #}
 
    # Initialize MediaPipe Hands and Drawing modules
    mp_hands = mp.solutions.hands
    mp_drawing = mp.solutions.drawing_utils
 
    # Open a connection to the external camera with reduced resolution
    webcam = cv2.VideoCapture(0)
    webcam.set(cv2.CAP_PROP_FRAME_WIDTH, 320)  # Set width to 320 pixels
    webcam.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)  # Set height to 240 pixels
 
    # Check if webcam is opened
    if not webcam.isOpened():
        print("Error: Could not open external camera.")
        exit()
 
    # Function to calculate angle between three points
    def calculate_angle(a, b, c):
        ang = math.degrees(math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(a[1] - b[1], a[0] - b[0]))
        return abs(ang)
 
    # Define finger landmarks (no pinky, only thumb, index, middle, and ring)
    finger_landmarks = {
        "Thumb": [1, 2, 3, 4],
        "Index": [5, 6, 7, 8],
        "Middle": [9, 10, 11, 12],
        "Ring": [13, 14, 15, 16],
    }
 
    # Threshold and smoothing parameters
    side_threshold = 0.08  # Adjusted sensitivity for "Left" and "Right"
    smoothing_factor = 0.2  # Higher smoothing factor for Raspberry Pi
    last_wrist_x = None
    frame_rate_limit = 10  # Limit FPS to around 10
    servo_debounce_time = 0.2  # Minimum time (in seconds) between servo updates
    last_servo_times = {finger: 0 for finger in servos}  # Store the last time each servo was updated
 
    # Initialize hand tracking model
    with mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.6, min_tracking_confidence=0.5) as hands:
        last_frame_time = time.time()
 
        # Set initial servo positions (all start at 180 degrees)
        for finger_name in servos:
            servos[finger_name].angle = 0
 
        last_servo_angles = {finger: 0 for finger in servos}  # Store initial angles
 
        while webcam.isOpened():
 
 
 
            # Limit FPS for smoother performance
            current_frame_time = time.time()
            if (current_frame_time - last_frame_time) < 1.0 / frame_rate_limit:
                continue  # Skip this frame to maintain frame rate
            last_frame_time = current_frame_time
 
            # Capture frame
            success, img = webcam.read()
            if not success:
                print("Ignoring empty camera frame.")
                continue
 
            # Convert image to RGB for MediaPipe processing
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            results = hands.process(img_rgb)
 
            # Detect hand landmarks
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    # Draw only keypoints (disable detailed connections for optimization)
                    mp_drawing.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS,
                                            mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=1, circle_radius=2),
                                            mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=1))
 
                    # Extract wrist and palm center (index MCP joint)
                    landmarks = {i: (lm.x, lm.y, lm.z) for i, lm in enumerate(hand_landmarks.landmark)}
                    wrist_x = landmarks[0][0]  # x-coordinate of wrist
                    palm_center_x = landmarks[9][0]  # x-coordinate of index MCP as palm center
 
                    # Smooth wrist side movement (Left/Right) using exponential moving average
                    if last_wrist_x is None:
                        last_wrist_x = wrist_x
                    smoothed_wrist_x = smoothing_factor * wrist_x + (1 - smoothing_factor) * last_wrist_x
                    last_wrist_x = smoothed_wrist_x
 
                    # Determine wrist side movement (Left, Right, or Centered)
                    if smoothed_wrist_x < palm_center_x - side_threshold:
                        wrist_position_side = "Wrist Moving Left"
                    elif smoothed_wrist_x > palm_center_x + side_threshold:
                        wrist_position_side = "Wrist Moving Right"
                    else:
                        wrist_position_side = "Wrist Centered"
 
                    # Display wrist side movement information
                    cv2.putText(img, wrist_position_side, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 0), 1)
 
                    # Process each finger for position and bend state
                    finger_info = []
                    for finger_name, points in finger_landmarks.items():
                        if is_locked:  # Don't update servos if locked
                                continue
 
                        mcp = landmarks[points[0]]
                        pip = landmarks[points[1]]
                        dip = landmarks[points[2]]
                        tip = landmarks[points[3]]
 
                        # Determine position, bend, and direction
                        position = "Up" if tip[1] < mcp[1] else "Down"
                        bend_state = "Bent" if calculate_angle(mcp, pip, dip) < 160 else "Straight"
                        direction = "Left" if tip[0] < landmarks[0][0] else "Right"
 
                        # Collect finger info for display
                        finger_info.append(f"{finger_name}: {position}, {bend_state}, {direction}")
 
                        # Control servo based on the finger bend state
                        if bend_state == "Bent":  # Finger is bent
                            servo_position = 180  # Move to 90 degrees (Down)
                        else:  # Finger is straight
                            servo_position = 0 # Move to 180 degrees (Up)
 
                        # Check if the time between servo updates is sufficient
                        current_time = time.time()
                        if current_time - last_servo_times[finger_name] >= servo_debounce_time:
                            # Only update the servo if the angle has changed significantly (within a dead zone)
                            if abs(servo_position - last_servo_angles[finger_name]) > 5:  # Dead zone of 5 degrees
                                servos[finger_name].angle = servo_position
                                last_servo_angles[finger_name] = servo_position
                                last_servo_times[finger_name] = current_time  # Update the last time this servo was updated
 
                    # Display limited finger information on screen
                    for i, info in enumerate(finger_info[:3]):  # Show only first 3 lines for readability
                        cv2.putText(img, info, (10, 40 + i * 20), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1)
 
            # Display the image
            cv2.imshow('AQUALIX', img)
 
            # Break the loop when 'q' is pressed
            if cv2.waitKey(5) & 0xFF == ord("q"):
                break
 
    # Release the webcam and close all OpenCV windows
    webcam.release()
    cv2.destroyAllWindows()
 
 
 
# Start a server thread for listening to new messages via TCP
server_thread =  threading.Thread(target=readData, daemon=True)
server_thread.start()
 
 
prostheticHand()