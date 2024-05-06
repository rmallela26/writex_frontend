import { fetchRequest } from "./CheckToken"

export const createDoc = async (name, access_token, id) => {
    console.log("access token ::::::")
    console.log(access_token)
    const item = await fetch("https://docs.googleapis.com/v1/documents", {
      method: "POST",
      headers: new Headers({ 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json'}),
      body: JSON.stringify({
        title: `${name} Essays`
      })
    })

    const response = await item.json()
    console.log(response)
    console.log(response.documentId)
    const docId = response.documentId

    if(!response) console.log("google api response broken")




    // const essay = "Interests and Talents Short Response,false,75,Why do you do what you do? Briefly describe your varied interests and talents and how they will fit at Allegheny in two or three sentences."
    // const essays = await fetch('http://localhost:3500/essays?id=65d5aacd3072bde4f4a8c092')
    console.log(id)
    const essays = await fetchRequest(`http://localhost:3500/colleges/essays?id=${id}`, "GET")
    // const essays = await fetch(`http://localhost:3500/colleges/essays?id=${id}`)
    if(!essays) {
        return
    }
    const essaysArr = await essays.json();
    if(essaysArr.length > 1) essaysArr.reverse()
    
    for(const essay of essaysArr) {
        console.log(essay)
        const info = essay.split('|') //SPLIT BY |
        const linesOfTextToEnter = [
        `${info[0]} (${info[1].toLowerCase() === "true" ? "Required" : "Optional"})`, //not working maybe check ut austin essays
        `${info[3]} (${info[2]} words)`
        ];

        let requests = [];

        linesOfTextToEnter
        .slice()
        .reverse()
        .forEach((lineOfText, index) => {
            let boldedText = ''
            if(index % 2 === 1) boldedText = `${lineOfText}\n`;
            else boldedText = `${lineOfText}\n\n`

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
                    bold: true,
                    'weightedFontFamily': {
                        'fontFamily': 'Times New Roman'
                    },
                    'fontSize': {
                        'magnitude': 12,
                        'unit': 'PT'
                    },
                },
                fields: "bold,weightedFontFamily,fontSize",
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
            // requests: [
            //   {
            //     insertText: {
            //       text: `${info[0]} (${info[1] ? "Required" : "Optional"})\n`,
            //       location: {
            //         index: 0,
            //       },
            //     },
            //   },
            // {
            //   insertText: {
            //     text: `${info[3]} (${info[2]} words)`,
            //     location: {
            //       index: 2,
            //     },
            //   },
            // },
            // {
            //   updateTextStyle: {
            //     textStyle: {
            //       bold: true,
            //     },
            //     fields: "bold",
            //     range: {
            //       startIndex: 1,
            //       // endIndex: textForDoc.length + 1,
            //     },
            //   },
            // },
            //],

            requests: requests
        })
        })
    }

    return docId;
  }