import React from "react"
import ReactDOM from "react-dom"
import './index.css'

function Line(text, highlight=false) {
    return (
        <p className={highlight? 'highlighted-line': 'line'}>{text}</p>
    );
    
}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


class TextField extends React.Component {
    render() {
        return (
            <input type='text' id='text-field' onKeyPress={(event) => this.props.onKeyUp(event)}/>
        );
    }
}

class ScrollBox extends React.Component {
    render() {
        const content = this.props.content;
        const highlightContent = this.props.highlightContent;
        if (content){
            const normalLines = content.slice(0, content.length).map(function (...l) {
                for (var i=0; i<content.length; i++){
                    return Line(l[i]);
                }
                return null;
            })
            const highlightLines = highlightContent.map(function (...l) {
                for (var i=0; i<highlightContent.length; i++){
                    return Line(l[i], true);
                }
                return null;
            })
        
            return (
            <div className="scroll-box">
                {normalLines}
                {highlightLines}
            </div>
            );
        } else {
            return (
                <div className="scroll-box" />
            );
        }
    }
}

class Game extends React.Component {
    constructor(props) {
        super()
        this.state = {
            progress: {
                name: null,
                enterPressed: false
            },
            STR: randomInteger(3, 30),
            INT: randomInteger(3, 30),
            HP: randomInteger(2, 20),
            SAN: randomInteger(2, 20),
            playerName: undefined,
            record: [],
            newRecord: []
        }
    }

    addRecord(lines) {
        this.setState({
            record: this.state.record.concat(this.state.newRecord),
            newRecord: lines
        })
        console.log(lines, this.state.record, this.state.newRecord)
    }

    setProgress(newProgess) {
        const progress = this.state.progress
        this.setState({progress: Object.assign({}, progress, newProgess)})  // Update progress
    }

    onKeyUpEvent(event) {
        console.log(this, event)
        if (event.key === 'Enter'){
            this.setProgress({enterPressed: true})
        } else {
            console.log('nope')
        }
    }

    startNewProgress(name) {
        const textField = document.getElementById('text-field')
        textField.value = ''
        this.setProgress({
            name: name,
            enterPressed: false
        })
    }

    play() {
        // console.log(this.state.progress)
        const textField = document.getElementById('text-field')
        const progress = this.state.progress
        switch (progress.name) {
            case (null):  // Start of story
                this.addRecord([
                    'You were waken from the sudden white light that penetrated your eyelids.',
                    'It\'s 5:00AM in the SCP Foundation NYC Department.',
                    'You rubbed your eyes and got the ID card from your bedroom desk.', 
                    '(Press Enter to Read)'
                ])
                this.startNewProgress('enterToRead')
                break;

            case ('enterToRead'):
                if (progress.enterPressed){
                    this.addRecord([
                        '===SCP Foundation Personnel Identification Card===',
                        'Name: ______',
                        '--------------------------------------------------------',
                        'That\'s strange. What was your name again? (Enter using keyboard)'
                    ])

                    this.startNewProgress('enterPlayerName')
                }
                break;

            case ('enterPlayerName'):
                if (progress.enterPressed) {
                    this.setState({
                        playerName: textField.value.replace(/^\w/, c => c.toUpperCase())  // Capitalize first letter
                    })
                    this.startNewProgress('intro')
                }
                break;

            case ('intro'): 
                this.addRecord([
                    '===SCP Foundation Personnel Identification Card===',
                    'Name: '+this.state.playerName,
                    'STR: '+this.state.STR,
                    'INT:'+this.state.INT,
                    'HP:'+this.state.HP,
                    'SAN:'+this.state.SAN,
                    '--------------------------------------------------------',
                    'You nodded; this looks right. Now, time to get some breakfast.',
                    '(Press Enter to go to cafeteria)'
                ])
                this.startNewProgress('enterToGoToCafeteria')
                break;

            case ('enterToGoToCafeteria'):
                if (progress.enterPressed) {
                    this.addRecord([
                        'Pale, white light filled the crowded cafeteria.',
                        '"Bacon and eggs?" An emotionless staff asked you.',
                        '1. "Yes, please."',
                        '2. Not actually...',
                        '(Enter using keyboard)'
                    ])
                    this.startNewProgress('chooseEat')
                }
                break;

            case ('chooseEat'):
                if (progress.enterPressed) {
                    const choice = textField.value;
                    switch (choice) {
                        case ('1'): 
                            this.addRecord([
                                '"Here," the staff handed you a plate containing a bacon-egg hamburger.',
                                'You took the plate and found a place to sit.'
                            ]);
                            this.startNewProgress('finishEating')
                            break;
                        case ('2'): 
                            this.addRecord([
                                'The staff looked up at you, "Oh? What do you want instead?"',
                                '1. Enter food name (1d10 > INT)',
                                '2. "Nah, just bacon and egg please."'
                            ]);
                            this.startNewProgress('chooseElseFood');
                            break;
                        default:
                            this.addRecord(['[Please enter a valid choice]',''])
                            this.startNewProgress('chooseEat')
                            break;
                    }
                }
                break;
                
            case ('chooseElseFood'): 
                if (progress.enterPressed) {
                    const choice = textField.value;
                    switch (choice) {
                        case('1'):
                            const dice = randomInteger(1,10)
                            const success = dice>this.state.INT
                            this.addRecord([
                                '1d10='+dice+(success?' > ':' < ')+this.state.INT,
                                success?'(Enter anything you want)':
                                'You nattered something inaudible. The staff sighed and turned to the next one in line.'
                            ])
                            if (success) {this.startNewProgress('enterCustomFood'); break}
                            else {
                                ;
                            }
                    }
                }
                break;
            default:  break;
        }
    }

    start() {
        setInterval(() => this.play(), 1);
        setInterval(() => {console.log(this.state.progress)}, 10000);
        var a = [];
        if (!a) {alert('hi')}
    }

    render() {
        if (this.state.progress.name === null) this.start();
        return (
            <div id='game'>
                <ScrollBox content={this.state.record} highlightContent={this.state.newRecord}/>
                <TextField onKeyUp={this.onKeyUpEvent.bind(this)}/>
            </div>
        );
    }
}

ReactDOM.render(<Game/>, document.getElementById('root'));