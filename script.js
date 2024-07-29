let gameState = {
    sanity: 100,
    time: 600, // 10:00 PM in minutes
    inventory: [],
    currentScene: 'intro'
};

const scenes = {
    intro: {
        text: "You arrive for your first day at Veridian Analytics, still grappling with the aftermath of a traumatic event in your recent past. The sterile, dimly lit office building does little to calm your nerves as you're led to a small, windowless room.",
        choices: [
            { text: "Enter the room", nextScene: 'meetFredric' }
        ]
    },
    meetFredric: {
        text: "Inside, you meet Fredric - a tall, broad-shouldered man with a gravelly voice and nicotine-stained fingers. His deep-set eyes seem to hold secrets, and the way he carries himself suggests a man who's seen more than he cares to remember.",
        choices: [
            { text: "Introduce yourself", nextScene: 'introduction' },
            { text: "Wait for Fredric to speak", nextScene: 'fredricSpeaks' }
        ]
    },
    introduction: {
        text: "You extend your hand and introduce yourself. Fredric gives a curt nod, his expression unreadable. 'Alex Mercer, our new night shift analyst. Let's get you up to speed.'",
        choices: [
            { text: "Ask about the job", nextScene: 'jobDescription' },
            { text: "Inquire about Fredric's role", nextScene: 'fredricRole' }
        ]
    },
    fredricSpeaks: {
        text: "Fredric eyes you for a moment before speaking. 'Alex Mercer, I presume. Welcome to the night shift. Hope you're ready for some... interesting work.'",
        choices: [
            { text: "Ask what he means by 'interesting'", nextScene: 'interestingWork' },
            { text: "Request to start the training", nextScene: 'startTraining' }
        ]
    },
    jobDescription: {
        text: "Fredric explains, 'The job's simple enough, kid. Just keep that accuracy up and don't ask too many questions. Trust me, it's better that way.' His words do little to ease your curiosity or anxiety.",
        choices: [
            { text: "Press for more details", nextScene: 'pressForDetails' },
            { text: "Nod and accept the vague description", nextScene: 'acceptDescription' }
        ]
    },
    fredricRole: {
        text: "You ask Fredric about his position. He chuckles darkly, 'I'm just the guy who makes sure the night shift runs smooth. Been here longer than I care to remember.' His eyes dart to the door, as if checking for eavesdroppers.",
        choices: [
            { text: "Ask how long he's worked here", nextScene: 'fredricTenure' },
            { text: "Inquire about other employees", nextScene: 'otherEmployees' }
        ]
    },
    interestingWork: {
        text: "Fredric's expression tightens. 'Let's just say it's not your average data entry job. You'll be processing some... sensitive information. The kind that might keep you up at night, if you let it.'",
        choices: [
            { text: "Express concern", nextScene: 'expressConcern' },
            { text: "Show enthusiasm", nextScene: 'showEnthusiasm' }
        ],
        onEnter: () => {
            modifySanity(-5);
            advanceTime(15);
        }
    },
    startTraining: {
        text: "Fredric nods approvingly. 'Eager to start, eh? Good. Let's begin with the basics of our data review process.' He leads you to a computer terminal.",
        choices: [
            { text: "Sit down at the terminal", nextScene: 'terminalTraining' }
        ]
    },
    pressForDetails: {
        text: "Fredric's eyes narrow. 'Look, kid. The less you know, the better you'll sleep. Just focus on the task at hand and leave the big picture stuff to the higher-ups.' His tone suggests this line of questioning is unwelcome.",
        choices: [
            { text: "Apologize and change the subject", nextScene: 'changeSubject' },
            { text: "Insist on more information", nextScene: 'insistInfo' }
        ],
        onEnter: () => {
            modifySanity(-5);
            advanceTime(10);
        }
    },
    acceptDescription: {
        text: "You nod, deciding it's best not to push further. Fredric seems relieved. 'Good. You'll do fine here. Now, let's get you set up at your workstation.'",
        choices: [
            { text: "Follow Fredric to the workstation", nextScene: 'workstation' }
        ]
    },
    fredricTenure: {
        text: "Fredric's face clouds over. 'Long enough to see things change, and not for the better. But that's not your concern. Let's focus on getting you trained up.'",
        choices: [
            { text: "Ask about the changes", nextScene: 'companyChanges' },
            { text: "Agree to start training", nextScene: 'startTraining' }
        ]
    },
    otherEmployees: {
        text: "Fredric hesitates before answering, 'Night shift's a skeleton crew. Just you, me, and a couple others you probably won't see much. We like to keep to ourselves.'",
        choices: [
            { text: "Express surprise at the small team", nextScene: 'smallTeam' },
            { text: "Ask about the day shift", nextScene: 'dayShift' }
        ]
    },
    expressConcern: {
        text: "Your unease must show on your face. Fredric sighs, 'Look, it's not for everyone. But it pays well, and you'll be doing important work. Just... try not to take it home with you.'",
        choices: [
            { text: "Ask about coping strategies", nextScene: 'copingStrategies' },
            { text: "Steele yourself and continue", nextScene: 'startTraining' }
        ],
        onEnter: () => {
            modifySanity(-5);
            advanceTime(10);
        }
    },
    showEnthusiasm: {
        text: "You express excitement about the challenging work. Fredric raises an eyebrow, looking almost impressed. 'That's the spirit, kid. Just remember that enthusiasm when things get tough.'",
        choices: [
            { text: "Ask what kind of tough situations to expect", nextScene: 'toughSituations' },
            { text: "Request to start working immediately", nextScene: 'startTraining' }
        ]
    },
    terminalTraining: {
        text: "You sit at the terminal, its screen casting a pale glow on your face. Fredric leans over your shoulder, his presence looming. 'Alright, let's start with the basics of our data review process.'",
        choices: [
            { text: "Pay close attention", nextScene: 'dataReviewBasics' },
            { text: "Glance around the room", nextScene: 'observeRoom' }
        ]
    },
    // ... more scenes ...

    endShift: {
        text: "As the clock strikes 6 AM, you feel a mix of relief and unease. Your first night at Veridian Analytics has left you with more questions than answers. Fredric appears, looking haggard. 'You made it, kid. Go home, get some rest. And remember... what happens on the night shift, stays on the night shift.'",
        choices: [
            { text: "Leave quietly", nextScene: 'gameEnd' },
            { text: "Confront Fredric about the night's events", nextScene: 'confrontFredric' }
        ]
    },
    gameEnd: {
        text: "You've survived your first night at Veridian Analytics, but at what cost? The secrets you've uncovered weigh heavily on your mind. Will you return for another shift, or leave this mysterious job behind? The choice is yours...",
        choices: [
            { text: "Play Again", nextScene: 'intro' }
        ]
    },
	dataReviewBasics: {
        text: "Fredric explains the basics of the data review process. 'You'll be analyzing various types of data: text, images, audio files. Your job is to flag anything suspicious or out of the ordinary. The system will guide you through the process.'",
        choices: [
            { text: "Ask about the criteria for 'suspicious'", nextScene: 'suspiciousCriteria' },
            { text: "Inquire about the source of the data", nextScene: 'dataSource' }
        ],
        onEnter: () => { advanceTime(20); }
    },
    observeRoom: {
        text: "As Fredric explains the basics, you glance around the room. You notice cameras in each corner and what looks like a reinforced door. The windowless space suddenly feels more claustrophobic.",
        choices: [
            { text: "Ask about the security measures", nextScene: 'securityMeasures' },
            { text: "Focus back on the training", nextScene: 'dataReviewBasics' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },
    suspiciousCriteria: {
        text: "Fredric's expression darkens. 'The system will highlight potential issues. Your job is to verify and categorize them. Don't overthink it, just follow the protocols.'",
        choices: [
            { text: "Press for more specific guidelines", nextScene: 'pressForGuidelines' },
            { text: "Accept the vague answer", nextScene: 'startFirstTask' }
        ],
        onEnter: () => { advanceTime(10); }
    },
    dataSource: {
        text: "'The data comes from various sources,' Fredric says evasively. 'Government agencies, private corporations, intercepted communications... That's all you need to know.'",
        choices: [
            { text: "Express concern about the legality", nextScene: 'legalityConcerns' },
            { text: "Nod and continue with the training", nextScene: 'startFirstTask' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },
    securityMeasures: {
        text: "Fredric follows your gaze. 'Veridian takes security seriously. We deal with sensitive information here. The measures are for everyone's protection.' His tone suggests you shouldn't pry further.",
        choices: [
            { text: "Ask if you're in danger", nextScene: 'dangerInquiry' },
            { text: "Return focus to the training", nextScene: 'dataReviewBasics' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },
    pressForGuidelines: {
        text: "Fredric sighs, 'Look, you'll know it when you see it. Unusual patterns, encrypted messages, questionable imagery. Just flag anything that raises red flags. The higher-ups will handle the rest.'",
        choices: [
            { text: "Express unease about the vagueness", nextScene: 'expressUnease' },
            { text: "Agree and move on", nextScene: 'startFirstTask' }
        ],
        onEnter: () => { advanceTime(15); }
    },
    startFirstTask: {
        text: "Fredric pulls up your first task. 'Alright, let's see how you handle this. Remember, accuracy is key.' The screen fills with a series of seemingly random numbers and letters.",
        choices: [
            { text: "Analyze the data carefully", nextScene: 'analyzeData' },
            { text: "Ask for a hint", nextScene: 'askForHint' }
        ],
        onEnter: () => { advanceTime(5); }
    },
    legalityConcerns: {
        text: "You voice your concerns about the legality of the data sources. Fredric's face hardens. 'Everything we do here is sanctioned at the highest levels. If you can't handle that, the door's right there.'",
        choices: [
            { text: "Apologize and continue the training", nextScene: 'startFirstTask' },
            { text: "Consider leaving", nextScene: 'contemplateLeaving' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(10);
        }
    },
    dangerInquiry: {
        text: "Fredric's expression is unreadable. 'Danger? No more than usual in this line of work. Just focus on your tasks and follow protocols. You'll be fine.' His words are not entirely reassuring.",
        choices: [
            { text: "Ask what he means by 'this line of work'", nextScene: 'lineOfWorkInquiry' },
            { text: "Drop the subject and continue training", nextScene: 'dataReviewBasics' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },
    expressUnease: {
        text: "You express your unease about the vague guidelines. Fredric's tone softens slightly, 'I get it, kid. It's not easy at first. But trust me, it's better not to know too much. Just do your job and try not to think about it too hard.'",
        choices: [
            { text: "Reluctantly agree", nextScene: 'startFirstTask' },
            { text: "Press for more information", nextScene: 'pressForMoreInfo' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },
    analyzeData: {
        text: "You scrutinize the data, looking for patterns or anomalies. After a few minutes, you notice a recurring sequence that seems out of place.",
        choices: [
            { text: "Flag the sequence", nextScene: 'flagSequence' },
            { text: "Ask Fredric for a second opinion", nextScene: 'askFredricOpinion' }
        ],
        onEnter: () => { advanceTime(15); }
    },
    askForHint: {
        text: "Fredric frowns, 'You need to learn to trust your instincts. But look for repeating patterns or anything that seems encoded. And remember, sometimes what's not there is as important as what is.'",
        choices: [
            { text: "Thank him and analyze the data", nextScene: 'analyzeData' },
            { text: "Ask what he means about 'what's not there'", nextScene: 'inquireAboutAbsences' }
        ],
        onEnter: () => { advanceTime(10); }
    },
	flagSequence: {
        text: "You flag the suspicious sequence. Fredric nods approvingly. 'Good catch. Now, let's move on to something more... interesting.' He pulls up a new file, this one filled with fragmented images and text snippets.",
        choices: [
            { text: "Examine the new file", nextScene: 'examineNewFile' },
            { text: "Ask about the previous sequence", nextScene: 'askAboutSequence' }
        ],
        onEnter: () => { advanceTime(20); }
    },
    examineNewFile: {
        text: "As you examine the new file, you start noticing patterns. Fragments of faces, coordinates, and what looks like encrypted messages. A chill runs down your spine as you realize the potential implications.",
        choices: [
            { text: "Report your findings", nextScene: 'reportFindings' },
            { text: "Dig deeper into the data", nextScene: 'digDeeper' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(30);
        }
    },
    digDeeper: {
        text: "You decide to investigate further. As you piece together the fragments, a disturbing picture emerges. The data seems to be tracking individuals, predicting their movements and actions with uncanny accuracy.",
        choices: [
            { text: "Confront Fredric about the data", nextScene: 'confrontFredric' },
            { text: "Secretly copy the data", nextScene: 'copyData' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(45);
        }
    },
    confrontFredric: {
        text: "You confront Fredric about the nature of the data. His face pales. 'You weren't supposed to piece that together so quickly. Look, there's more going on here than you realize. We need to talk, but not here.'",
        choices: [
            { text: "Agree to talk privately", nextScene: 'privateTalk' },
            { text: "Demand answers now", nextScene: 'demandAnswers' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(15);
        }
    },
    privateTalk: {
        text: "Fredric leads you to a secluded area. 'Veridian isn't just a data analysis firm. We're part of a global network predicting and influencing world events. The data you're analyzing... it's shaping the future.'",
        choices: [
            { text: "Ask about the ethical implications", nextScene: 'ethicalConcerns' },
            { text: "Inquire about your role in this", nextScene: 'yourRole' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(30);
        }
    },
    ethicalConcerns: {
        text: "Fredric sighs heavily. 'Ethics? We're beyond that now. This is about survival. The world is on the brink of collapse, and we're the last line of defense. But there's a faction within Veridian that wants to use this power for their own gain.'",
        choices: [
            { text: "Offer to help expose the corrupt faction", nextScene: 'offerHelp' },
            { text: "Express desire to leave Veridian", nextScene: 'desireToLeave' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(20);
        }
    },
    offerHelp: {
        text: "'You're either brave or foolish, kid. But I'm glad you're on board. We need to access the main server room to gather evidence. It's risky, but it might be our only chance to stop them.'",
        choices: [
            { text: "Agree to the plan", nextScene: 'infiltrateServerRoom' },
            { text: "Suggest contacting authorities", nextScene: 'contactAuthorities' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(15);
        }
    },
    infiltrateServerRoom: {
        text: "You and Fredric make your way to the server room. As you download the incriminating data, alarms blare. 'We've been discovered!' Fredric shouts. 'We need to get this data out, no matter what!'",
        choices: [
            { text: "Try to escape with the data", nextScene: 'escapeAttempt' },
            { text: "Stay and confront the security team", nextScene: 'confrontSecurity' }
        ],
        onEnter: () => { 
            modifySanity(-25);
            advanceTime(45);
        }
    },
    escapeAttempt: {
        text: "You run through the corridors, the flash drive clutched tightly in your hand. As you round a corner, you come face to face with the CEO of Veridian. 'I'm impressed you got this far,' she says, 'but did you really think we wouldn't have predicted this?'",
        choices: [
            { text: "Demand explanations", nextScene: 'finalReveal' },
            { text: "Attempt to bargain", nextScene: 'bargainAttempt' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },
    finalReveal: {
        text: "The CEO laughs, 'You've stumbled into a war for the future of humanity. Veridian's predictive algorithms don't just analyze data - they shape reality itself. We're not just predicting the future, we're creating it. And now, you're a part of it too.'",
        choices: [
            { text: "Refuse to be part of their plans", nextScene: 'refusePlans' },
            { text: "Consider the implications", nextScene: 'considerImplications' }
        ],
        onEnter: () => { 
            modifySanity(-30);
            advanceTime(20);
        }
    },
    considerImplications: {
        text: "As the weight of the revelation sinks in, you realize the true scope of Veridian's power. The choice before you is monumental: join them in shaping the world's destiny, or stand against a force that can rewrite reality itself.",
        choices: [
            { text: "Join Veridian", nextScene: 'joinVeridian' },
            { text: "Oppose Veridian", nextScene: 'opposeVeridian' }
        ],
        onEnter: () => { 
            modifySanity(-25);
            advanceTime(15);
        }
    },
    joinVeridian: {
        text: "You decide to join Veridian, recognizing the potential to guide humanity's future. The CEO smiles, 'Welcome to the real night shift, Alex. Together, we'll write the next chapter of human history.'",
        choices: [
            { text: "End Game", nextScene: 'gameEnd' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(10);
        }
    },
    opposeVeridian: {
        text: "You stand defiant, refusing to be part of Veridian's manipulation. 'Then you leave us no choice,' the CEO sighs. As security surrounds you, you realize your fight is just beginning. The future is unwritten, and you're determined to keep it that way.",
        choices: [
            { text: "End Game", nextScene: 'gameEnd' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(10);
        }
    },
    gameEnd: {
        text: "Your first night at Veridian Analytics has changed everything. The world is not what you thought it was, and your role in it has been irrevocably altered. As dawn breaks, you know that nothing will ever be the same again.",
        choices: [
            { text: "Play Again", nextScene: 'intro' }
        ]
    },
	askAboutSequence: {
        text: "You inquire about the significance of the sequence you flagged. Fredric hesitates, then says, 'Let's just say it's part of a bigger picture. Now, focus on the next task.'",
        choices: [
            { text: "Continue with the next task", nextScene: 'examineNewFile' }
        ],
        onEnter: () => { advanceTime(10); }
    },
    reportFindings: {
        text: "You report your findings to Fredric. He nods gravely, 'You're catching on quick. Too quick, maybe. Let's see how you handle the next level.'",
        choices: [
            { text: "Proceed to the next level", nextScene: 'nextLevel' }
        ],
        onEnter: () => { advanceTime(15); }
    },
    nextLevel: {
        text: "The next set of data is even more complex. You notice patterns that seem to predict global events, stock market fluctuations, and even individual behaviors.",
        choices: [
            { text: "Analyze the patterns", nextScene: 'analyzePatterns' },
            { text: "Question the data's source", nextScene: 'questionSource' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(30);
        }
    },
    analyzePatterns: {
        text: "As you delve deeper into the patterns, a disturbing realization dawns on you. These aren't just predictions - they're too accurate, too precise.",
        choices: [
            { text: "Continue analyzing", nextScene: 'digDeeper' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(20);
        }
    },
    questionSource: {
        text: "You ask Fredric about the source of this incredibly accurate data. He tenses up, 'That's not something you need to worry about. Just do your job.'",
        choices: [
            { text: "Press the issue", nextScene: 'pressIssue' },
            { text: "Back off and continue working", nextScene: 'digDeeper' }
        ],
        onEnter: () => { advanceTime(10); }
    },
    pressIssue: {
        text: "As you press Fredric for answers, alarms suddenly blare throughout the building. Fredric curses under his breath, 'I knew you were too perceptive for your own good. Come with me if you want to know the truth.'",
        choices: [
            { text: "Follow Fredric", nextScene: 'followFredric' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },
    followFredric: {
        text: "Fredric leads you through a maze of corridors to a hidden room. 'What I'm about to show you will change everything you thought you knew about the world.'",
        choices: [
            { text: "Enter the room", nextScene: 'hiddenRoom' }
        ],
        onEnter: () => { advanceTime(10); }
    },
    hiddenRoom: {
        text: "The room is filled with advanced technology you've never seen before. Holographic displays show real-time data flows from around the world. Fredric turns to you, his expression grave.",
        choices: [
            { text: "Ask what this all means", nextScene: 'revealTruth' }
        ],
        onEnter: () => { 
            modifySanity(-25);
            advanceTime(15);
        }
    },
    revealTruth: {
        text: "'Veridian isn't just analyzing data,' Fredric explains. 'We're shaping reality itself. But there's a faction that wants to use this power for their own gain. I need your help to stop them.'",
        choices: [
            { text: "Agree to help", nextScene: 'agreeToHelp' },
            { text: "Express skepticism", nextScene: 'expressSkepticism' }
        ],
        onEnter: () => { 
            modifySanity(-30);
            advanceTime(20);
        }
    },
    agreeToHelp: {
        text: "You agree to help Fredric. He quickly outlines a plan to access the main server room and gather evidence against the corrupt faction.",
        choices: [
            { text: "Proceed with the plan", nextScene: 'infiltrateServerRoom' }
        ],
        onEnter: () => { advanceTime(15); }
    },
    expressSkepticism: {
        text: "You express doubt about Fredric's claims. He sighs, 'I know it's hard to believe, but we don't have time for skepticism. The fate of the world is at stake.'",
        choices: [
            { text: "Reluctantly agree to help", nextScene: 'infiltrateServerRoom' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(10);
        }
    },
    copyData: {
        text: "You manage to copy the incriminating data, but as you finish, you hear footsteps approaching. There's no time to exit normally.",
        choices: [
            { text: "Hide and wait", nextScene: 'hideAndWait' },
            { text: "Make a run for it", nextScene: 'escapeAttempt' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(20);
        }
    },
    hideAndWait: {
        text: "You hide as security guards enter the room. They seem to be searching for something - or someone. After a tense few minutes, they leave, and Fredric slips in.",
        choices: [
            { text: "Show Fredric the copied data", nextScene: 'showFredricData' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },
    showFredricData: {
        text: "Fredric examines the data you've copied. 'This is it. This proves everything. We need to get this out now, but they're onto us.'",
        choices: [
            { text: "Plan an escape", nextScene: 'escapeAttempt' }
        ],
        onEnter: () => { advanceTime(10); }
    },
    bargainAttempt: {
        text: "You try to bargain with the CEO, offering to trade the data for your freedom. She smirks, 'You still don't understand the scale of what's happening here, do you?'",
        choices: [
            { text: "Demand explanations", nextScene: 'finalReveal' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(10);
        }
    },
    refusePlans: {
        text: "You firmly refuse to be part of Veridian's plans. The CEO sighs, 'I was hoping you'd be reasonable. But in the end, your cooperation isn't necessary - just your participation.'",
        choices: [
            { text: "Ask what she means", nextScene: 'considerImplications' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },
	demandAnswers: {
        text: "You demand answers from Fredric immediately. He looks around nervously, 'Not here, not now. We're being watched. Meet me in the parking garage in 10 minutes if you want the truth.'",
        choices: [
            { text: "Agree to the meeting", nextScene: 'parkingGarageMeeting' },
            { text: "Refuse and continue working", nextScene: 'refuseMeeting' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(5);
        }
    },
    parkingGarageMeeting: {
        text: "You arrive at the dimly lit parking garage. Fredric emerges from the shadows, looking agitated. 'We don't have much time. Veridian isn't what you think it is. We're part of something much bigger.'",
        choices: [
            { text: "Listen to Fredric's explanation", nextScene: 'fredricExplanation' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(15);
        }
    },
    fredricExplanation: {
        text: "Fredric reveals that Veridian's data analysis is actually shaping world events. 'We're not just predicting the future, we're creating it. But some want to use this power for their own gain.'",
        choices: [
            { text: "Offer to help Fredric", nextScene: 'offerHelp' },
            { text: "Express disbelief", nextScene: 'expressDisbelief' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(20);
        }
    },
    refuseMeeting: {
        text: "You decide to ignore Fredric's request and continue working. As you delve deeper into the data, alarming patterns begin to emerge, hinting at a vast conspiracy.",
        choices: [
            { text: "Investigate further", nextScene: 'digDeeper' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(30);
        }
    },
    expressDisbelief: {
        text: "You express skepticism about Fredric's claims. He sighs, 'I knew it would be hard to believe. But I can prove it to you. We need to access the main server room.'",
        choices: [
            { text: "Agree to see the proof", nextScene: 'infiltrateServerRoom' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },
    contactAuthorities: {
        text: "You suggest contacting the authorities. Fredric laughs bitterly, 'The authorities? They're part of this too. We're on our own here.'",
        choices: [
            { text: "Reconsider and agree to help", nextScene: 'infiltrateServerRoom' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(15);
        }
    },
    confrontSecurity: {
        text: "You decide to stand your ground and confront the security team. As they burst into the room, you're surprised to see the CEO leading them. 'I'm impressed you got this far,' she says.",
        choices: [
            { text: "Demand explanations", nextScene: 'finalReveal' }
        ],
        onEnter: () => { 
            modifySanity(-25);
            advanceTime(10);
        }
    },
    desireToLeave: {
        text: "You express your desire to leave Veridian and forget everything you've learned. Fredric shakes his head, 'I'm afraid that's not an option anymore. You're in too deep now.'",
        choices: [
            { text: "Reluctantly agree to help", nextScene: 'infiltrateServerRoom' },
            { text: "Attempt to escape", nextScene: 'escapeAttempt' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },
    yourRole: {
        text: "You ask about your role in this grand scheme. Fredric explains, 'Your analysis helps refine our predictions. But more importantly, you're now a wild card - someone who could change everything.'",
        choices: [
            { text: "Ask how you can change things", nextScene: 'changeThings' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(20);
        }
    },
    changeThings: {
        text: "'By knowing the truth, you've already altered the future,' Fredric says. 'Now, we need to expose the corrupt faction within Veridian. It's our only chance to prevent a catastrophe.'",
        choices: [
            { text: "Agree to help expose the corruption", nextScene: 'infiltrateServerRoom' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(15);
        }
    },
    considerImplications: {
        text: "As you consider the implications of what you've learned, the full weight of the situation hits you. The power to shape reality itself is at stake, and you're now at the center of this conflict.",
        choices: [
            { text: "Ask about the consequences of joining Veridian", nextScene: 'joinConsequences' },
            { text: "Inquire about the risks of opposing them", nextScene: 'oppositionRisks' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(20);
        }
    },
    joinConsequences: {
        text: "The CEO explains, 'By joining us, you'll have the power to shape the world, to prevent disasters before they happen. But it comes at a cost - the burden of knowing the future and the responsibility of changing it.'",
        choices: [
            { text: "Consider joining Veridian", nextScene: 'joinVeridian' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(15);
        }
    },
    oppositionRisks: {
        text: "'Opposing us won't be easy,' the CEO warns. 'You'll be fighting against the flow of reality itself. But if you succeed, you'll preserve the concept of free will for humanity.'",
        choices: [
            { text: "Consider opposing Veridian", nextScene: 'opposeVeridian' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(15);
        }
    },
	askFredricOpinion: {
        text: "You ask Fredric for his opinion on the data. He studies it briefly, his expression darkening. 'You've spotted something significant. I think it's time you learned what's really going on here.'",
        choices: [
            { text: "Listen to Fredric's explanation", nextScene: 'fredricExplanation' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(15);
        }
    },

    inquireAboutAbsences: {
        text: "You ask Fredric what he means about 'what's not there.' He looks at you intently, 'Sometimes, the absence of data is more telling than its presence. It might indicate something being deliberately hidden.'",
        choices: [
            { text: "Consider the implications", nextScene: 'analyzeData' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },

    copyData: {
        text: "You manage to copy the incriminating data, but as you finish, alarms start blaring throughout the building. Fredric bursts into the room, 'They know! We need to get out of here now!'",
        choices: [
            { text: "Escape with Fredric", nextScene: 'escapeAttempt' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },

    hideAndWait: {
        text: "You hide as security guards enter the room. After a tense few minutes, they leave. Fredric slips in, looking worried. 'We've been compromised. It's now or never.'",
        choices: [
            { text: "Make a run for it", nextScene: 'escapeAttempt' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(20);
        }
    },

    showFredricData: {
        text: "You show Fredric the data you've copied. His eyes widen, 'This is it. This proves everything. But they're onto us. We need to get this out now.'",
        choices: [
            { text: "Plan an escape", nextScene: 'escapeAttempt' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(10);
        }
    },

    bargainAttempt: {
        text: "You try to bargain with the CEO, offering to trade the data for your freedom. She smirks, 'You still don't understand the scale of what's happening here, do you?'",
        choices: [
            { text: "Listen to her explanation", nextScene: 'finalReveal' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(10);
        }
    },

    refusePlans: {
        text: "You firmly refuse to be part of Veridian's plans. The CEO sighs, 'I was hoping you'd be reasonable. But in the end, your cooperation isn't necessary - just your participation.'",
        choices: [
            { text: "Ask what she means", nextScene: 'finalReveal' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },

    joinVeridian: {
        text: "You decide to join Veridian, recognizing the potential to guide humanity's future. The CEO smiles, 'Welcome to the real night shift, Alex. Together, we'll write the next chapter of human history.'",
        choices: [
            { text: "Begin your new role", nextScene: 'epilogueJoin' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(10);
        }
    },

    opposeVeridian: {
        text: "You stand defiant, refusing to be part of Veridian's manipulation. 'Then you leave us no choice,' the CEO sighs. As security surrounds you, you realize your fight is just beginning.",
        choices: [
            { text: "Prepare for the coming struggle", nextScene: 'epilogueOppose' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(10);
        }
    },

    epilogueJoin: {
        text: "Months later, you find yourself at the heart of Veridian's operations. The power to shape reality is intoxicating, but the weight of responsibility is immense. As you make decisions that will alter the course of history, you wonder if you made the right choice.",
        choices: [
            { text: "Reflect on your journey", nextScene: 'gameEnd' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(30);
        }
    },

    epilogueOppose: {
        text: "In the weeks following your escape from Veridian, you've become the leader of a resistance movement. Armed with the knowledge of their reality-altering capabilities, you fight to expose the truth and preserve humanity's free will. The road ahead is uncertain, but you're determined to see it through.",
        choices: [
            { text: "Contemplate the future", nextScene: 'gameEnd' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(30);
        }
    },

    gameEnd: {
        text: "Your journey through the night shift at Veridian Analytics has changed everything. The world is not what you thought it was, and your role in it has been irrevocably altered. As you look to the future, you know that nothing will ever be the same again.",
        choices: [
            { text: "Play Again", nextScene: 'intro' }
        ]
    },
	pressForMoreInfo: {
        text: "As you press for more information, Fredric's expression turns grim. 'You're persistent, I'll give you that. Fine, but remember, once you know, there's no going back.'",
        choices: [
            { text: "Listen to Fredric's explanation", nextScene: 'fredricExplanation' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(15);
        }
    },

    companyChanges: {
        text: "Fredric hesitates before speaking, 'Veridian used to be about pure data analysis. Now... let's just say we're more proactive in shaping outcomes. It's not just about predicting anymore.'",
        choices: [
            { text: "Ask what he means by 'shaping outcomes'", nextScene: 'revealTruth' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(20);
        }
    },

    smallTeam: {
        text: "You express surprise at the small team. Fredric nods, 'The fewer people involved, the easier it is to control the information. And believe me, this information needs to be controlled.'",
        choices: [
            { text: "Ask about the nature of the information", nextScene: 'questionSource' }
        ],
        onEnter: () => { 
            modifySanity(-5);
            advanceTime(10);
        }
    },

    dayShift: {
        text: "When you ask about the day shift, Fredric's expression darkens. 'They handle the public face of Veridian. We... we deal with the real work at night. The work that shapes the world.'",
        choices: [
            { text: "Press for more details", nextScene: 'revealTruth' }
        ],
        onEnter: () => { 
            modifySanity(-10);
            advanceTime(15);
        }
    },

    copingStrategies: {
        text: "You ask Fredric about coping strategies. He sighs, 'Kid, there's no easy way to deal with this. Some of us drink, some throw themselves into the work. Me? I just try to remember why we're doing this.'",
        choices: [
            { text: "Ask why they're doing this", nextScene: 'revealTruth' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(20);
        }
    },

    toughSituations: {
        text: "Fredric looks at you seriously, 'Imagine seeing a disaster coming and having to decide whether to prevent it or let it happen for the 'greater good'. That's the kind of tough situation we deal with.'",
        choices: [
            { text: "Ask how they make such decisions", nextScene: 'revealTruth' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },

    lineOfWorkInquiry: {
        text: "'This line of work,' Fredric says, his voice low, 'involves shaping the future. And that kind of power always comes with risks. Still want to know more?'",
        choices: [
            { text: "Insist on knowing the truth", nextScene: 'revealTruth' }
        ],
        onEnter: () => { 
            modifySanity(-15);
            advanceTime(10);
        }
    },

    contemplateLeaving: {
        text: "As you contemplate leaving, Fredric grabs your arm. 'It's too late for that. You're part of this now, whether you like it or not. The only way out is through.'",
        choices: [
            { text: "Reluctantly agree to stay", nextScene: 'revealTruth' }
        ],
        onEnter: () => { 
            modifySanity(-20);
            advanceTime(15);
        }
    },

    revealTruth: {
        text: "Fredric takes a deep breath, 'Veridian isn't just analyzing data. We're shaping reality itself. Our predictions don't just forecast the future - they create it. But some want to use this power for their own gain.'",
        choices: [
            { text: "Ask how to stop the corrupt faction", nextScene: 'infiltrateServerRoom' }
        ],
        onEnter: () => { 
            modifySanity(-25);
            advanceTime(30);
        }
    }
	
};

function updateScene(sceneId) {
    const scene = scenes[sceneId];
    document.getElementById('story').innerHTML = scene.text;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice');
        button.addEventListener('click', () => makeChoice(choice.nextScene));
        choicesDiv.appendChild(button);
    });
    if (scene.onEnter) {
        scene.onEnter();
    }
}

function makeChoice(nextScene) {
    gameState.currentScene = nextScene;
    updateScene(nextScene);
    updateStats();
}

function updateStats() {
    document.getElementById('sanity-value').textContent = gameState.sanity;
    const hours = Math.floor(gameState.time / 60);
    const minutes = gameState.time % 60;
    document.getElementById('time-value').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    if (gameState.sanity <= 0) {
        endGame('sanity');
    } else if (gameState.time >= 1080) { // 6:00 AM
        updateScene('endShift');
    }
}

function modifySanity(amount) {
    gameState.sanity = Math.max(0, Math.min(100, gameState.sanity + amount));
}

function advanceTime(minutes) {
    gameState.time += minutes;
}

function addToInventory(item) {
    gameState.inventory.push(item);
    updateInventory();
}

function updateInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    gameState.inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

function endGame(reason) {
    let message = "";
    if (reason === 'sanity') {
        message = "The stress and disturbing nature of your work at Veridian Analytics has taken its toll. You can no longer distinguish reality from paranoid delusions. Game Over.";
    }
    document.getElementById('story').innerHTML = message;
    document.getElementById('choices').innerHTML = '<button onclick="startGame()">Restart</button>';
}

function startGame() {
    gameState = {
        sanity: 100,
        time: 600,
        inventory: [],
        currentScene: 'intro'
    };
    updateScene('intro');
    updateStats();
    updateInventory();
}

startGame();