# daytimer
A browser script recording what time you devote to work or other activities during the day. 

! It uses <strong>the local storage of your browser</strong> and does not require any server part to store data.

!! It records the time you spend on a certain kind of activity and then presents it on various scales:
<ul>
<li> by time of beginning
<li> by total time spent on this activity
<li> by sequence
<li> and by share of time, as a pie-chart

</ul>

<h2>How to use</h2>
<ol>
<li>Fork this repository
<li>Go to dist/SETTINGS.json
<li>In SETTINGS.json set the activities you need in the following format:
"name": "<em>activity name</em>", "color": "<em>activity color in hex or word format</em>"
<li>Open dist/INDEX.html: now you should see the list of activities you have set in SETTINGS.json, as well as START & STOP buttons and empty scales below
<li>START button is greyed out and shows text "Set a tag". Go ahead and click on any activity on the left. 
<li>START button becomes active. Press it to launch the counter. 
<li>When you are done, press STOP button: the data will be recorded on the scales
<li>To clear the Local Storage, press RESET button in bottom left corner of the screen
</ol>
<h2>Advantages to this script:</h2>
<ul>
<li>Totally autonomous, does not require a server or internet connection
<li>Any number of activities and corresponding colors can be set through SETTINGS.json
<li>Gives bright visual representation of your daily activities in time and correlation
</ul>
<h2>To get the idea of how it works:</h2>
Go to the live preview <a href="https://nadyawyn.github.io/daytimer/dist">here</a>.

