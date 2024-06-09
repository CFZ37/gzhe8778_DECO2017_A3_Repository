# DECO2017 A3 Tracker App Prototype: Gymtrak

## Overview
Gymtrak is a platform that allows for new gym-goers to track gym sessions and individual workouts they complete to help them maintain a steady exercise rhythm and motivate them to maintain a healthy and frequent gym routine. 

## Prototype Features
The premise of the platform is simple. Users are prompted to create a new session using the 'session' form. They can select:  
- A star rating out of 5, and  
- Add the duration of the session.  

Then, once a session has been created, users can then add detailed info about individual workouts they completed. This includes:  
- Selecting a workout category (from Cardio, Legs, Back, Arms, Chest, and Other) 
- Typing the name of the workout they completed
- Inputting the amount of sets and reps completed
- Recording the weight they trained with (this could be an average weight, their highest, or their lowest)    

Once submitted, the session and the workouts will appear to the right (or below on mobile). All their past sessions and workouts will be displayed here. Users have the option to delete info about individual workout items or the entire session. 

## Version control
The versions of this application are tracked using a Github repository at this location: https://github.com/CFZ37/gzhe8778_DECO2017_A3_Repository  

> **Version Control Issues - Disclaimer**  
> I unfortunately missed a few tutorials where repository and server set-up (including Github, node.js and express) were discussed. When I had time to catch up on content, I chose to work on the interactive task list activities first and learn backend later. This means I began working on code using VSCode locally before importing it into the current repository. thus, a detailed timeline of changes is largely absent from the repository. 

## Setup and Usage
This prototype uses node.js and Express. To access the prototype, use VSCode's in-built terminal and type "npm start", navigating to the local 8888 port. Otherwise, run a live server using the "index.html" page. 

## Design Changes from Mockups
Skill and time constraints meant that initial mockup designs were a bit too ambitious to be realised within this application prototype. However, changes and improvements in a similar vein were carried out in the final prototype design. 

![Home page](public\images\gymtrak1.png)  

![Home page](public\images\gymtrak2.png)

The largest change was the complete removal of the calendar system on the left. The concept of creating a clickable calendar with the 'tasks' being displayed on the right was just too far out of reach for this assessment. Instead, the submission form (top image) occupied the left section of the prototype. Users are now able to see past session and workout info while they input new entries using the form.  

## Structural Changes from Mockups
The original data model designs also had to undergo slight adjustments when deciding what elements or properties seemed to difficult to create for this prototype.   
1. **Attached image for workout category dropdown:** When choosing workout categories, the original plan was for users to be shown an icon next to respective dropdown options for visual aid. This was deemed too difficult to reproduce and was simplified to a regular text-only dropdown 
2. **PR (Personal Record) tracking:** The initial plan was to display a "personal best" within the individual workout item cards after they were submitted. This would have been done by tracking the highest "weight" value previously submitted with the same workout (e.g. '90kg' and 'Deadlift'). This, however, seemed like it would only be logical for a small set of workouts, so it was removed from the data model.

## AI acknowledgmeents  
ChatGPT was utilised in some portions of the assignment to assist in code writing, spotting mistakes, and explaining. Here are examples of some prompts that were given:
- "One of my form inputs is a star rating. How would I make sessionRating a clickable star rating?" 
- "I made some changes to the HTML and CSS formatting but that meant that the tasklist in javascript stopped appearing. Can you find the mistakes and fix the code so that the submitted items appear on page with a delete button?" 
- "I'm trying to implement localStorage usage in the application. Which section of my code would this be possible in, and how would I go about adding it?"
- "Can you explain the syntax for the filter method?"
- "Can you write a js function that would allow users to specify the session that they want to add their workout to? Also highlight where else I would need to update my code"
- "Currently, the displayed tasks show up as sessions and workouts in their respective category. How can I make it so that workouts appear under the respective sessions they belong to?" 