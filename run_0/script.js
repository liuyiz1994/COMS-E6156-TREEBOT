const jsonData0 = [{"sender": "Alice", "message": "Given the current positions of our grippers and the rope ends, I propose that we both move to pick up the rope. I will pick up the rope_front_end and you, Bob, will pick up the rope_back_end. \n\nHere is my proposed path: I will move from my current position (0.09, -0.07, 0.51) to the rope_front_end (-1.21, 0.41, 0.16). To avoid the obstacle_wall_front_top (-0.18, 0.21, 0.46), I will first move up to a height of 0.55, then move towards the rope_front_end while maintaining this height, and finally move down to pick up the rope. The path is as follows: [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.16)].\n\nBob, please propose your path for picking up the rope_back_end. Remember to avoid the obstacle_wall_back_top (-0.01, 0.79, 0.46) and to maintain a fixed distance between our grippers."}, {"sender": "Bob", "message": "I agree with your plan, Alice. I will pick up the rope_back_end. My current position is (0.05, 1.10, 0.62). I will first move up to a height of 0.55, then move towards the rope_back_end while maintaining this height, and finally move down to pick up the rope. This will ensure that I avoid the obstacle_wall_back_top (-0.01, 0.79, 0.46). The path is as follows: [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.16)]. \n\nLet's proceed with this plan."}, {"sender": "Alice", "message": "EXECUTE\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.16)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.16)]"}, {"sender": "Feedback", "message": "[Environment Feedback]:\n- Previous Plan:\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.16)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.16)]\n- Waypoint Step Alice (-1.21, 0.41, 0.16); Bob (-0.54, 0.48, 0.16):\n   - Collision detected: collided object pairs: table-Alice, table-Bob\n  "}, {"sender": "Action", "message": "Alice: PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.16)]\nBob: PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.16)]"}, {"sender": "Alice", "message": "It seems that our last waypoints were too low and caused a collision with the table. We need to adjust the height of our final waypoints to avoid this. \n\nBob, I propose we adjust the z-coordinate of our final waypoints to 0.25, which is the height of the table. This should prevent any further collisions. \n\nHere is my adjusted path: [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.25)]. \n\nPlease adjust your path accordingly and let's proceed with this plan."}, {"sender": "Bob", "message": "I agree with your adjustment, Alice. We should indeed increase the height of our final waypoints to avoid colliding with the table. \n\nHere is my adjusted path: [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.25)]. \n\nLet's proceed with this plan.\n\nEXECUTE\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.25)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.25)]"}, {"sender": "Feedback", "message": "[Environment Feedback]:\n- Previous Plan:\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.25)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.25)]\n- Waypoint Step Alice (-1.21, 0.41, 0.25); Bob (-0.54, 0.48, 0.25):\n   - Collision detected: collided object pairs: Alice-table\n  "}, {"sender": "Action", "message": "Alice: PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.25)]\nBob: PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.25)]"}, {"sender": "Alice", "message": "It seems that my final waypoint is still too low and causing a collision with the table. I need to adjust the height of my final waypoint to avoid this. \n\nBob, I propose we adjust the z-coordinate of our final waypoints to 0.29, which is slightly above the height of the table. This should prevent any further collisions. \n\nHere is my adjusted path: [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.29)]. \n\nPlease adjust your path accordingly and let's proceed with this plan."}, {"sender": "Bob", "message": "I agree with your adjustment, Alice. We should indeed increase the height of our final waypoints to avoid colliding with the table. \n\nHere is my adjusted path: [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.29)]. \n\nLet's proceed with this plan.\n\nEXECUTE\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.29)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.29)]"}, {"sender": "Feedback", "message": "None"}, {"sender": "Action", "message": "Alice: PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.56, 0.17, 0.55), (-1.21, 0.41, 0.55), (-1.21, 0.41, 0.29)]\nBob: PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.25, 0.79, 0.55), (-0.54, 0.48, 0.55), (-0.54, 0.48, 0.29)]"}];
function createChatBubble(sender, message) {
    const bubbleWrapper = document.createElement("div");
    bubbleWrapper.className = "bubble-wrapper";

    const nameBox = document.createElement("div");
    nameBox.className = "user-name-box";
    nameBox.innerText = sender;

    const bubble = document.createElement("div");
    bubble.className = `.chat-bubble ${sender}-bubble`;
    bubble.innerText = message;

    bubbleWrapper.appendChild(nameBox);
    bubbleWrapper.appendChild(bubble);
    return bubbleWrapper;
    }  
        
// Get the chat container element
const chatContainer0 = document.getElementById("chat-container-0");
    
// Iterate over the JSON data and generate chat bubbles
jsonData0.forEach(
    
    data => {
    const { sender, message } = data;
    const bubble = createChatBubble(sender, message);
    
    chatContainer0.appendChild(bubble);
    
});
    
const jsonData1 = [{"sender": "Alice", "message": "Given our current positions and the positions of the groove ends, I propose that we both move to put the rope ends into the groove. I will put the rope_front_end into the groove_left_end and you, Bob, will put the rope_back_end into the groove_right_end. \n\nHere is my proposed path: I will move from my current position (-1.20, 0.40, 0.25) to the groove_left_end (0.20, 0.50, 0.36). To avoid the obstacle_wall_front_top (-0.18, 0.21, 0.46), I will first move up to a height of 0.55, then move towards the groove_left_end while maintaining this height, and finally move down to put the rope. The path is as follows: [(-1.20, 0.40, 0.55), (-0.50, 0.45, 0.55), (0.20, 0.50, 0.55), (0.20, 0.50, 0.36)].\n\nBob, please propose your path for putting the rope_back_end into the groove_right_end. Remember to avoid the obstacle_wall_back_top (-0.01, 0.79, 0.46) and to maintain a fixed distance between our grippers."}, {"sender": "Bob", "message": "I agree with your plan, Alice. I will put the rope_back_end into the groove_right_end. My current position is (-0.54, 0.48, 0.25). I will first move up to a height of 0.55, then move towards the groove_right_end while maintaining this height, and finally move down to put the rope. This will ensure that I avoid the obstacle_wall_back_top (-0.01, 0.79, 0.46). The path is as follows: [(-0.54, 0.48, 0.55), (0.23, 0.49, 0.55), (0.61, 0.49, 0.55), (1.00, 0.50, 0.36)]. \n\nLet's proceed with this plan. \n\nEXECUTE\nNAME Alice ACTION PUT rope_front_end groove_left_end PATH [(-1.20, 0.40, 0.55), (-0.50, 0.45, 0.55), (0.20, 0.50, 0.55), (0.20, 0.50, 0.36)]\nNAME Bob ACTION PUT rope_back_end groove_right_end PATH [(-0.54, 0.48, 0.55), (0.23, 0.49, 0.55), (0.61, 0.49, 0.55), (1.00, 0.50, 0.36)]"}, {"sender": "Feedback", "message": "None"}, {"sender": "Action", "message": "Alice: PUT rope_front_end groove_left_end PATH [(-1.20, 0.40, 0.55), (-0.50, 0.45, 0.55), (0.20, 0.50, 0.55), (0.20, 0.50, 0.36)]\nBob: PUT rope_back_end groove_right_end PATH [(-0.54, 0.48, 0.55), (0.23, 0.49, 0.55), (0.61, 0.49, 0.55), (1.00, 0.50, 0.36)]"}];
// Get the chat container element
const chatContainer1 = document.getElementById("chat-container-1");
    
// Iterate over the JSON data and generate chat bubbles
jsonData1.forEach(
    
    data => {
    const { sender, message } = data;
    const bubble = createChatBubble(sender, message);
    
    chatContainer1.appendChild(bubble);
    
});
    