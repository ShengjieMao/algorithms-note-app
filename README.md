# algorithms-note-app
This app allows users to access the online data structure and algorithms notebook to record, check, and show their opinions toward the memo and notes they or others made about data knowledge. The app was developed with Javascript with the React library. The database is built in Supabase and the online deployment relies on the Netlify.

## App Thumbnails
The overall view of the app
![overall](https://github.com/ShengjieMao/algorithms-note-app/blob/main/img/overall-layout.png)

Check certain tags you are interested in
![certain tag](https://github.com/ShengjieMao/algorithms-note-app/blob/main/img/view-certain-tag.png)

See total number of notes in the storage
![see notes count](https://github.com/ShengjieMao/algorithms-note-app/blob/main/img/track-all-notes.png)

Show whether you believe this is hard, fine, or you nailed it
![share opinion](https://github.com/ShengjieMao/algorithms-note-app/blob/main/img/share-your-attitude.png)

Track the source provided by the note recorder
![track url](https://github.com/ShengjieMao/algorithms-note-app/blob/main/img/trackable-source.png)

Add your own notes
![add notes](https://github.com/ShengjieMao/algorithms-note-app/blob/main/img/add-new-note.png)

And choose a proper tag for others
![tag notes](https://github.com/ShengjieMao/algorithms-note-app/blob/main/img/tag-selection.png)



## App instructions 
To run the app, you could either run the codes with <sub>npm start</sub> or directly access the website [here](https://data-algo-notes.netlify.app/).

Users can basically check all the notes recorded in the database and can check specific tags with the buttons on the side. They could track the origin of the memo by simply clicking the the "source" button next to each notes. And if they feel that the knowledge is a troublesome one, they could click the sad emoji to indicate their feelings! They could also indicate that they are expertised in that topic, or they believe that the knowledge is just fine for them. THey there are more people believe that the certain note is a hard one, they that note is a "community-wide" troublesome :«. We should all pay more attention to that topic! 

When youfind out something that you also want to record down, you can just click the "record a note" button and a pop up window will appear. You can add a new note by filling out the note contents (no more than 200 words) and resourceful url (in the form of "http://" or "https://"), and taging a proper category. 

When your new note is uploading, the form will turn to gray and no new changes can be made before the submitting process finished. This also applies to your "criticizing" process. 



## Action log
Mar 29, 2023 - Initial push, design the basic structure

Mar 30, 2023 - Init styling file

Mar 11, 2023 - Added validity checks (partial)

May 26, 2023 - Finished all coding and deploying of the app
