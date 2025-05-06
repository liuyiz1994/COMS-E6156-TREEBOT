const jsonData0 = [{"sender": "Alice", "message": "Given our current positions, I suggest we both move to pick up the rope. I will move to pick up the rope_front_end and you, Bob, will move to pick up the rope_back_end. \n\nHere is my proposed path: \nI will move from my current position (0.09, -0.07, 0.51) to the rope_front_end (-1.20, 0.48, 0.16). To avoid the obstacle_wall_front_top (-0.28, 0.25, 0.49), I will first move up to a height of 0.55, then move towards the rope_front_end while maintaining this height, and finally move down to pick up the rope_front_end. \n\nThe path is: [(0.09, -0.07, 0.55), (-0.55, 0.20, 0.55), (-0.93, 0.34, 0.55), (-1.20, 0.48, 0.55), (-1.20, 0.48, 0.16)].\n\nBob, please propose your path to pick up the rope_back_end. \n\nLet's discuss further if needed."}, {"sender": "Bob", "message": "I agree with your plan, Alice. I will move to pick up the rope_back_end. \n\nHere is my proposed path: \nI will move from my current position (0.05, 1.10, 0.62) to the rope_back_end (-0.51, 0.65, 0.16). To avoid the obstacle_wall_back_top (0.06, 0.75, 0.49), I will first move up to a height of 0.55, then move towards the rope_back_end while maintaining this height, and finally move down to pick up the rope_back_end. \n\nThe path is: [(0.05, 1.10, 0.55), (-0.23, 0.92, 0.55), (-0.39, 0.78, 0.55), (-0.51, 0.65, 0.55), (-0.51, 0.65, 0.16)].\n\nLet's discuss further if needed."}, {"sender": "Alice", "message": "I agree with your plan and path, Bob. It seems that both our paths avoid the obstacle_wall and are evenly spaced. \n\nLet's proceed with these actions. \n\nEXECUTE\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.55, 0.20, 0.55), (-0.93, 0.34, 0.55), (-1.20, 0.48, 0.55), (-1.20, 0.48, 0.16)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.23, 0.92, 0.55), (-0.39, 0.78, 0.55), (-0.51, 0.65, 0.55), (-0.51, 0.65, 0.16)]"}, {"sender": "Feedback", "message": "[Environment Feedback]:\n- Previous Plan:\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.55, 0.20, 0.55), (-0.93, 0.34, 0.55), (-1.20, 0.48, 0.55), (-1.20, 0.48, 0.16)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.23, 0.92, 0.55), (-0.39, 0.78, 0.55), (-0.51, 0.65, 0.55), (-0.51, 0.65, 0.16)]\n- Waypoint Step Alice (-1.20, 0.48, 0.16); Bob (-0.51, 0.65, 0.16):\n   - Collision detected: collided object pairs: table-Alice\n  "}, {"sender": "Action", "message": "Alice: PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.55, 0.20, 0.55), (-0.93, 0.34, 0.55), (-1.20, 0.48, 0.55), (-1.20, 0.48, 0.16)]\nBob: PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.23, 0.92, 0.55), (-0.39, 0.78, 0.55), (-0.51, 0.65, 0.55), (-0.51, 0.65, 0.16)]"}, {"sender": "Alice", "message": "It seems that my last waypoint collided with the table. I will adjust my path to avoid this collision. \n\nHere is my revised path: \nI will move from my current position (0.09, -0.07, 0.51) to the rope_front_end (-1.20, 0.48, 0.16). To avoid the obstacle_wall_front_top (-0.28, 0.25, 0.49) and the table, I will first move up to a height of 0.55, then move towards the rope_front_end while maintaining this height, and finally move down to pick up the rope_front_end at a height of 0.25, which is above the table height. \n\nThe path is: [(0.09, -0.07, 0.55), (-0.55, 0.20, 0.55), (-0.93, 0.34, 0.55), (-1.20, 0.48, 0.55), (-1.20, 0.48, 0.25)].\n\nBob, your previous path seems fine. Please confirm if you will stick with it or propose a new one. \n\nLet's discuss further if needed."}, {"sender": "Bob", "message": "I agree with your revised plan, Alice. Your new path avoids the table and still reaches the rope_front_end. \n\nAs for my path, since there was no collision detected in the previous round, I will stick with it. \n\nHere is my path again for reference: \nI will move from my current position (0.05, 1.10, 0.62) to the rope_back_end (-0.51, 0.65, 0.16). To avoid the obstacle_wall_back_top (0.06, 0.75, 0.49), I will first move up to a height of 0.55, then move towards the rope_back_end while maintaining this height, and finally move down to pick up the rope_back_end. \n\nThe path is: [(0.05, 1.10, 0.55), (-0.23, 0.92, 0.55), (-0.39, 0.78, 0.55), (-0.51, 0.65, 0.55), (-0.51, 0.65, 0.16)].\n\nLet's proceed with these actions. \n\nEXECUTE\nNAME Alice ACTION PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.55, 0.20, 0.55), (-0.93, 0.34, 0.55), (-1.20, 0.48, 0.55), (-1.20, 0.48, 0.25)]\nNAME Bob ACTION PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.23, 0.92, 0.55), (-0.39, 0.78, 0.55), (-0.51, 0.65, 0.55), (-0.51, 0.65, 0.16)]"}, {"sender": "Feedback", "message": "None"}, {"sender": "Action", "message": "Alice: PICK rope_front_end PATH [(0.09, -0.07, 0.55), (-0.55, 0.20, 0.55), (-0.93, 0.34, 0.55), (-1.20, 0.48, 0.55), (-1.20, 0.48, 0.25)]\nBob: PICK rope_back_end PATH [(0.05, 1.10, 0.55), (-0.23, 0.92, 0.55), (-0.39, 0.78, 0.55), (-0.51, 0.65, 0.55), (-0.51, 0.65, 0.16)]"}];
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
    
const jsonData1 = [{"sender": "Alice", "message": "Given our current positions, I suggest we both move to put the rope into the groove. I will move to put the rope_front_end into the groove_left_end and you, Bob, will move to put the rope_back_end into the groove_right_end. \n\nHere is my proposed path: \nI will move from my current position (-1.20, 0.48, 0.25) to the groove_left_end (0.20, 0.50, 0.36). To avoid the obstacle_wall_front_top (-0.28, 0.25, 0.49), I will first move up to a height of 0.55, then move towards the groove_left_end while maintaining this height, and finally move down to put the rope_front_end into the groove_left_end. \n\nThe path is: [(-1.20, 0.48, 0.55), (-0.50, 0.49, 0.55), (0.10, 0.50, 0.55), (0.20, 0.50, 0.55), (0.20, 0.50, 0.36)].\n\nBob, please propose your path to put the rope_back_end into the groove_right_end. \n\nLet's discuss further if needed."}, {"sender": "Bob", "message": "I agree with your plan, Alice. I will move to put the rope_back_end into the groove_right_end. \n\nHere is my proposed path: \nI will move from my current position (-0.52, 0.65, 0.25) to the groove_right_end (1.00, 0.50, 0.36). To avoid the obstacle_wall_back_top (0.06, 0.75, 0.49), I will first move up to a height of 0.55, then move towards the groove_right_end while maintaining this height, and finally move down to put the rope_back_end into the groove_right_end. \n\nThe path is: [(-0.52, 0.65, 0.55), (0.24, 0.62, 0.55), (0.74, 0.56, 0.55), (1.00, 0.50, 0.55), (1.00, 0.50, 0.36)].\n\nLet's discuss further if needed."}, {"sender": "Alice", "message": "I agree with your plan and path, Bob. It seems that both our paths avoid the obstacle_wall and are evenly spaced. \n\nLet's proceed with these actions. \n\nEXECUTE\nNAME Alice ACTION PUT rope_front_end groove_left_end PATH [(-1.20, 0.48, 0.55), (-0.50, 0.49, 0.55), (0.10, 0.50, 0.55), (0.20, 0.50, 0.55), (0.20, 0.50, 0.36)]\nNAME Bob ACTION PUT rope_back_end groove_right_end PATH [(-0.52, 0.65, 0.55), (0.24, 0.62, 0.55), (0.74, 0.56, 0.55), (1.00, 0.50, 0.55), (1.00, 0.50, 0.36)]"}, {"sender": "Feedback", "message": "None"}, {"sender": "Action", "message": "Alice: PUT rope_front_end groove_left_end PATH [(-1.20, 0.48, 0.55), (-0.50, 0.49, 0.55), (0.10, 0.50, 0.55), (0.20, 0.50, 0.55), (0.20, 0.50, 0.36)]\nBob: PUT rope_back_end groove_right_end PATH [(-0.52, 0.65, 0.55), (0.24, 0.62, 0.55), (0.74, 0.56, 0.55), (1.00, 0.50, 0.55), (1.00, 0.50, 0.36)]"}];
// Get the chat container element
const chatContainer1 = document.getElementById("chat-container-1");
    
// Iterate over the JSON data and generate chat bubbles
jsonData1.forEach(
    
    data => {
    const { sender, message } = data;
    const bubble = createChatBubble(sender, message);
    
    chatContainer1.appendChild(bubble);
    
});
    