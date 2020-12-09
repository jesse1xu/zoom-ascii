import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Button, withStyles } from '@material-ui/core';


const styles = {
  inputBox: {
    '& .MuiOutlinedInput-inputMultiline': {
      fontFamily: 'Courier New',
      height: '580px',
      marginTop: '20px'
    },
    '& .MuiOutlinedInput-multiline': {
      height: '600px'
    }
  },
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
      marginTop: '30px',
      marginBottom: '30px',
      width: '43%',
    },
  },
  submitButton: {
    marginLeft: 'calc(50% - 100px)',
    display: 'block',
    width: '200px'
  },
};

function App(props) {
  const { classes } = props;
  const [value, setValue] = React.useState('');
  const [buttonText, setText] = React.useState('Submit');
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCopy = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(value).then(function() {
      console.log("we good");
    }, function(e) {
      console.log(e);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let { meetingTitle, meetingID, meetingUrl } = parseInput(value);

    let ascii = `
     _.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._
    ,'_.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._
   (  (                                                 )  )
    )  ) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (  (
   (  (  !!!                                       !!!  )  )
    )  ) !!!  d88888D  .d88b.   .d88b.  .88b  d88. !!! (  (
   (  (  !!!  YP  d8' .8P  Y8. .8P  Y8. 88'YbdP'88 !!!  )  )
    )  ) !!!     d8'  88    88 88    88 88  88  88 !!! (  (
   (  (  !!!    d8'   88    88 88    88 88  88  88 !!!  )  )
    )  ) !!!   d8' db '8b  d8' '8b  d8' 88  88  88 !!! (  (
   (  (  !!!  d88888P  'Y88P'   'Y88P'  YP  YP  YP !!!  )  )
    )  ) !!!                                       !!! (  (
   (  (  !!!!:!!!!!!!!!!!!!:!!!!!!!!!!!!!!!!:!!!!!:!!!  )  )                 
    )  ) !!!:!!:!!::!!!!!:!!!:!!!::!!!!!:!!:!!!:!!!:!! (  (
   (  (  !:!!!:!:::!!!:!!:!:!!!:!!!:!!::!:!:!!!:!!!:!:  )  )
    )  ) :!!::!::!:!::!!:!::!!::!!::!:!:!:!!!::::!::!! (  (
   (  (  ::!:::::!::::!::::!::::!:::!:::::::!::::::!::  )  )
    )  ) ::::::::::::::::::::::::::::::::::::::::::::: (  (
   (  (  :::_______________________________________:::  )  )
    )  ) ::|         ${meetingTitle}         |:: (  (
   (  (  ::|_______________________________________|::  )  )
    )  ) ::::::::::::::::::::::::::::::::::::::::::::: (  (
   (  (  :::_______________________________________:::  )  )
    )  ) ::|       Meeting ID: ${meetingID}       |:: (  (
   (  (  ::|_______________________________________|::  )  )
    )  ) ::::::::::::::::::::::::::::::::::::::::::::: (  (
   (  (  :::_______________________________________:::  )  )
    )  ) ::|  ${meetingUrl}  |:: (  (
   (  (  ::|_______________________________________|::  )  )
    )  ) ::::::::::::::::::::::::::::::::::::::::::::: (  (
   (  (  :.:: ::.:: ::..:::.:::.::: :.::::.:: ::.::::.  )  )
    )  ) .:.:::.: ::::. :::.:: :..:::.:::.:: .::. :..: (  (
   (  (  .:: ::. :: . ::.:.: .:...:::.: :.::.:: ::.::.  )  )
    )  ) :  :. . .:  ::. .: .: . .: :.  :.: ::.:  :. . (  (
   (  (   . . :.  :. . . :  .:.. :  .  : ..:  .:.  ..:  )  )
    )  ) .     .   . ..    .    .  .   .  .   . .    . (  (
   (  (_.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._)jx)
    '._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-._.-,'
    `;


    setValue(ascii);
    setText('Copy to Clipboard')
  };

  const parseInput = (input) => {
    const titlePtn = "[\n\r].*Topic: \s*([^\n\r]*)"
    const idPtn = "[\n\r].*Meeting ID: \s*([^\n\r]*)"
    const urlPtn = "[\n\r].*Join Zoom Meeting\n\s*([^\n\r]*)"

    let meetingTitle = input.match(titlePtn)[1];
    let meetingID = input.match(idPtn)[1];
    let meetingUrl = input.match(urlPtn)[1];

    return {
      meetingTitle, 
      meetingID,
      meetingUrl
    }
  };

  return (
    <div className="App">
      <form 
        className={classes.root} 
        noValidate 
        autoComplete="off"
        onSubmit={buttonText === 'Submit' ? handleSubmit : handleCopy}>
        <TextField
            className={classes.inputBox}
            fontFamily='Courier New'
            multiline
            rows={20}
            fullWidth 
            spellCheck='False'
            placeholder="Paste Zoom invitation here"
            value={value}
            variant="outlined"
            onChange={handleChange}
          />
        <Button 
          className= {classes.submitButton}
          variant="contained" 
          color="primary" 
          size="large" 
          type="submit">
          {buttonText}
        </Button>
      </form>
    </div>
  );

}

export default withStyles(styles)(App)