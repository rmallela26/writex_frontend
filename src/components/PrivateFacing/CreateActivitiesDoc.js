import { fetchRequest } from "./CheckToken"

export const createActivitiesDoc = async (name, access_token) => {
    console.log("access token ::::::")
    console.log(access_token)
    const item = await fetch("https://docs.googleapis.com/v1/documents", {
        method: "POST",
        headers: new Headers({ 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json'}),
        body: JSON.stringify({
        title: name
        })
    })

    const response = await item.json()
    console.log(response)
    console.log(response.documentId)
    const docId = response.documentId




    // const essay = "Interests and Talents Short Response,false,75,Why do you do what you do? Briefly describe your varied interests and talents and how they will fit at Allegheny in two or three sentences."
    // const essays = await fetch('http://localhost:3500/essays?id=65d5aacd3072bde4f4a8c092')

    let linesOfTextToEnter = []
    let divider = 3
    if(name === "Common App Honors") {
        linesOfTextToEnter = [
            //1
            "Honor 1 title (100 characters): ",
            "Grade level(s): ",
            "Level(s) of recognition: ",
            //2
            "Honor 2 title (100 characters): ",
            "Grade level(s): ",
            "Level(s) of recognition: ",
            //3
            "Honor 3 title (100 characters): ",
            "Grade level(s): ",
            "Level(s) of recognition: ",
            //4
            "Honor 4 title (100 characters): ",
            "Grade level(s): ",
            "Level(s) of recognition: ",
            //5
            "Honor 5 title (100 characters): ",
            "Grade level(s): ",
            "Level(s) of recognition: "
        ];    
    } else if(name === "Common App Activities") {
        linesOfTextToEnter = [
            //1
            "1 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //2
            "2 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //3
            "3 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //4
            "4 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //5
            "5 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //6
            "6 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //7
            "7 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //8
            "8 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //9
            "9 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
            //10
            "10 Position/Leadership description (50 characters): ",
            "Organization Name (100 characters): ",
            "Please describe this activity, including what you accomplished and any recognition you received, etc. (150 characters): ",
            "Grade level(s): ",
            "Time of participation: ",
            "Hours spent per week: ",
            "Weeks spent per year: ",
            "I intend to participate in a similar activity in college: ",
        ];    
        divider = 8
    }

    let requests = [];

    linesOfTextToEnter
    .slice()
    .reverse()
    .forEach((lineOfText, index) => {
        let boldedText = ''
        if(index % divider === 0) boldedText = `${lineOfText}\n\n`
        else boldedText = `${lineOfText}\n`;

        requests = requests.concat([
            {
            insertText: {
                text: boldedText,
                location: {
                index: 1,
                },
            },
            },
            {
            updateTextStyle: {
                textStyle: {
                    'weightedFontFamily': {
                        'fontFamily': 'Calibri'
                    },
                    'fontSize': {
                        'magnitude': 12,
                        'unit': 'PT'
                    },
                    'foregroundColor': {
                        'color': {
                            'rgbColor': {
                                'blue': 0.74,
                                'green': 0.51,
                                'red': 0.31
                            }
                        }
                    }
                },
                fields: "foregroundColor,fontSize,weightedFontFamily",
                range: {
                    startIndex: 1,
                    endIndex: boldedText.length,
                },
            },
            },
        ])
    });
    

    const newItem = await fetch(`https://docs.googleapis.com/v1/documents/${response.documentId}:batchUpdate`, {
    method: "POST",
    headers: new Headers({ 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json'}),
    body: JSON.stringify({
        requests: requests
    })
    })

    return docId;
    }