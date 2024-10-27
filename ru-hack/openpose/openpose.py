import cv2 as cv
import numpy as np
from flask import Flask, Response

app = Flask(__name__)

# Define your body parts and pose pairs as before
BODY_PARTS = {
    "Nose": 0,
    "Neck": 1,
    "RShoulder": 2,
    "RElbow": 3,
    "RWrist": 4,
    "LShoulder": 5,
    "LElbow": 6,
    "LWrist": 7,
    "RHip": 8,
    "RKnee": 9,
    "RAnkle": 10,
    "LHip": 11,
    "LKnee": 12,
    "LAnkle": 13,
    "REye": 14,
    "LEye": 15,
    "REar": 16,
    "LEar": 17,
    "Background": 18,
    "UpperBack": 19,
    "MiddleBack": 20,
    "LowerBack": 21,
}

POSE_PAIRS = [
    ["Neck", "RShoulder"],
    ["Neck", "LShoulder"],
    ["RShoulder", "RElbow"],
    ["RElbow", "RWrist"],
    ["LShoulder", "LElbow"],
    ["LElbow", "LWrist"],
    ["Neck", "RHip"],
    ["RHip", "RKnee"],
    ["RKnee", "RAnkle"],
    ["Neck", "LHip"],
    ["LHip", "LKnee"],
    ["LKnee", "LAnkle"],
    ["Neck", "Nose"],
    ["Nose", "REye"],
    ["REye", "REar"],
    ["Nose", "LEye"],
    ["LEye", "LEar"],
    ["Neck", "UpperBack"],
    ["UpperBack", "MiddleBack"],
    ["MiddleBack", "LowerBack"],
]

# Load the neural network
net = cv.dnn.readNetFromTensorflow("graph_opt.pb")

# Function to generate video frames
def generate_frames():
    cap = cv.VideoCapture(0)  # 0 for the default camera

    while True:
        hasFrame, frame = cap.read()
        if not hasFrame:
            break

        # Resize frame as per your requirements
        inWidth = 368
        inHeight = 368
        net.setInput(
            cv.dnn.blobFromImage(
                frame,
                1.0,
                (inWidth, inHeight),
                (127.5, 127.5, 127.5),
                swapRB=True,
                crop=False,
            )
        )
        out = net.forward()
        out = out[:, :22, :, :]  # Ensure correct output shape

        frameWidth = frame.shape[1]
        frameHeight = frame.shape[0]

        points = []
        for i in range(len(BODY_PARTS)):
            heatMap = out[0, i, :, :]
            _, conf, _, point = cv.minMaxLoc(heatMap)
            x = (frameWidth * point[0]) / out.shape[3]
            y = (frameHeight * point[1]) / out.shape[2]
            points.append((int(x), int(y)) if conf > 0.2 else None)

        # Process and draw the body parts as in your original script
        # (Add the angle calculations and drawing code here as needed)

        # Start with black border, change to red if angles are not in range
        border_color = (0, 255, 0)  # Change as needed based on your logic

        # Calculate the elbow angle
        elbow_angle_ok = False
        shoulder_angle_ok = False
        if (
            points[BODY_PARTS["RShoulder"]]
            and points[BODY_PARTS["RElbow"]]
            and points[BODY_PARTS["RWrist"]]
        ):
            shoulder = np.array(points[BODY_PARTS["RShoulder"]])
            elbow = np.array(points[BODY_PARTS["RElbow"]])
            wrist = np.array(points[BODY_PARTS["RWrist"]])

            upper_arm = elbow - shoulder
            forearm = wrist - elbow
            angle_rad = np.arctan2(forearm[1], forearm[0]) - np.arctan2(
                upper_arm[1], upper_arm[0]
            )
            angle_deg = np.degrees(angle_rad)

            if angle_deg < 0:
                angle_deg += 360
            if angle_deg > 180:
                angle_deg = 360 - angle_deg

            elbow_angle_ok = 0 <= angle_deg <= 120
            cv.putText(
                frame,
                f"Elbow Angle: {int(angle_deg)}",
                (points[BODY_PARTS["RElbow"]][0] + 10, points[BODY_PARTS["RElbow"]][1]),
                cv.FONT_HERSHEY_SIMPLEX,
                0.5,
                (255, 255, 255),
                2,
            )

        if (
            points[BODY_PARTS["Neck"]]
            and points[BODY_PARTS["RShoulder"]]
            and points[BODY_PARTS["RElbow"]]
        ):
            neck = np.array(points[BODY_PARTS["Neck"]])
            shoulder = np.array(points[BODY_PARTS["RShoulder"]])
            elbow = np.array(points[BODY_PARTS["RElbow"]])

            neck_to_shoulder = neck - shoulder
            shoulder_to_elbow = elbow - shoulder
            angle_rad = np.arctan2(shoulder_to_elbow[1], shoulder_to_elbow[0]) - np.arctan2(
                neck_to_shoulder[1], neck_to_shoulder[0]
            )
            shoulder_angle_deg = np.degrees(angle_rad)

            if shoulder_angle_deg < 0:
                shoulder_angle_deg += 360
            if shoulder_angle_deg > 180:
                shoulder_angle_deg = 360 - shoulder_angle_deg

            shoulder_angle_ok = 70 <= shoulder_angle_deg <= 120
            cv.putText(
                frame,
                f"Shoulder Angle: {int(shoulder_angle_deg)}",
                (
                    points[BODY_PARTS["RShoulder"]][0] + 10,
                    points[BODY_PARTS["RShoulder"]][1] + 20,
                ),
                cv.FONT_HERSHEY_SIMPLEX,
                0.5,
                (255, 255, 255),
                2,
            )

        # Start with black border, change to red if angles are not in range
        if elbow_angle_ok and shoulder_angle_ok:
            border_color = (0, 255, 0)
        elif (
            points[BODY_PARTS["RShoulder"]]
            and points[BODY_PARTS["RElbow"]]
            and points[BODY_PARTS["RWrist"]]
        ):
            border_color = (0, 0, 255)
        else:
            border_color = (0, 0, 0)

        cv.rectangle(frame, (0, 0), (frameWidth - 1, frameHeight - 1), border_color, 10)

        # Draw the body parts and connections
        for pair in POSE_PAIRS:
            partFrom = pair[0]
            partTo = pair[1]
            idFrom = BODY_PARTS[partFrom]
            idTo = BODY_PARTS[partTo]

            if points[idFrom] and points[idTo]:
                cv.line(frame, points[idFrom], points[idTo], (0, 255, 0), 3)
                cv.ellipse(frame, points[idFrom], (3, 3), 0, 0, 360, (0, 0, 255), cv.FILLED)
                cv.ellipse(frame, points[idTo], (3, 3), 0, 0, 360, (0, 0, 255), cv.FILLED)

        # Encode the frame as JPEG
        ret, buffer = cv.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Yield the frame in the format required for video streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video-feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)  # Adjust the host and port as needed

if __name__ == "__main__":
    app.run(port=5001)  # Change to a different port