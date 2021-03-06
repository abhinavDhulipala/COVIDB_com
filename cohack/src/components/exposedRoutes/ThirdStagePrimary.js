import React, { Component } from 'react';
import QuestionBox from "../QuestionBox";
import exposedAPI from "../../symptomaticQuestions/exposed";
import FourthStagePrimary from "./FourthStagePrimary";
import Button from "react-bootstrap/Button";

class ThirdStagePrimary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionBank: [],
            worked: false,
            clickedNext: false
        }
    }

    getQuestions = () => {
        exposedAPI(3).then(question => {
            this.setState({questionBank: question});
        });
    }

    computeAnswer = (answer, correct) => {
        if (answer === "Yes") {
            this.setState({
                worked: true
            });
        } else {
            this.setState({
                worked: false
            });
        }
    }

    clickNext = () => {
        this.setState({
            clickedNext: true
        })
    }

    componentDidMount() {
        this.getQuestions();
    }

    render() {
        const isSenior = this.props.senior;
        const questionBank = this.state.questionBank;
        const clickedNext = this.state.clickedNext;
        const worked = this.state.worked;

        return (
            <div>
                {!clickedNext &&
                    questionBank.map(({question, answers,
                    correct, questionId}) => <QuestionBox question=
                    {question} options={answers} key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}/>)
                }
                {!clickedNext &&
                <Button onClick={this.clickNext.bind(this)}> Next </Button>
                }
                {clickedNext && !worked &&
                    <FourthStagePrimary senior={isSenior}/>
                }
                {clickedNext && worked &&
                    <div>
                        <h2> You may be eligible for COVID-19 testing. </h2>
                        <p> Stay home (or Keep your child home) and take care of yourself (or your child).
                            Call your (or your child’s) medical provider. </p>
                        <p> Contact the occupational health provider at your workplace immediately. </p>
                    </div>
                }
            </div>
        )
    }
}

export default ThirdStagePrimary