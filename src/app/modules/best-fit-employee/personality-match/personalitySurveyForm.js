import React, { useState } from 'react';
import axios from 'axios';
import { Survey, Model, StylesManager } from 'survey-react';
import 'survey-react/defaultV2.css';

StylesManager.applyTheme('defaultV2');

const PersonalitySurveyForm = (props) => {
  const [attritionResult, setAttrtionResult] = useState({
    Most_important_features: []
  });
  const [showAttritionResult, setShowAttrtionResult] = useState(false);

  const surveyJson = {
    elements: [
      {
        name: 'EXT1',
        type: 'rating',
        title: 'I am the life of the party',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT2',
        type: 'rating',
        title: 'I dont talk a lot',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT3',
        type: 'rating',
        title: 'I feel comfortable around people',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT4',
        type: 'rating',
        title: 'I keep in the background',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT5',
        type: 'rating',
        title: 'I start conversations',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT6',
        type: 'rating',
        title: 'I have little to say',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT7',
        type: 'rating',
        title: 'I talk to a lot of different people at parties',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT8',
        type: 'rating',
        title: 'I dont like to draw attention to myself',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT9',
        type: 'rating',
        title: 'I dont mind being the center of attention',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EXT10',
        type: 'rating',
        title: 'I am quiet around strangers',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST1',
        type: 'rating',
        title: 'I get stressed out easily',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST2',
        type: 'rating',
        title: 'I am relaxed most of the time',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST3',
        type: 'rating',
        title: 'I worry about things',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST4',
        type: 'rating',
        title: 'I seldom feel blue',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST5',
        type: 'rating',
        title: 'I am easily disturbed',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST6',
        type: 'rating',
        title: 'I get upset easily',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST7',
        type: 'rating',
        title: 'I change my mood a lot',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST8',
        type: 'rating',
        title: 'I have frequent mood swings',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST9',
        type: 'rating',
        title: 'I get irritated easily',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'EST10',
        type: 'rating',
        title: 'I often feel blue',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR1',
        type: 'rating',
        title: 'I feel little concern for others',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR2',
        type: 'rating',
        title: 'I am interested in people',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR3',
        type: 'rating',
        title: 'I insult people',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR4',
        type: 'rating',
        title: 'I sympathize with others feelings',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR5',
        type: 'rating',
        title: 'I am not interested in other peoples problems',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR6',
        type: 'rating',
        title: 'I have a soft heart',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR7',
        type: 'rating',
        title: 'I am not really interested in others',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR8',
        type: 'rating',
        title: 'I take time out for others',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR9',
        type: 'rating',
        title: 'I feel others emotions',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'AGR10',
        type: 'rating',
        title: 'I make people feel at ease',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN1',
        type: 'rating',
        title: 'I am always prepared',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN2',
        type: 'rating',
        title: 'I leave my belongings around',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN3',
        type: 'rating',
        title: 'I pay attention to details',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN4',
        type: 'rating',
        title: 'I make a mess of things',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN5',
        type: 'rating',
        title: 'I get chores done right away',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN6',
        type: 'rating',
        title: 'I often forget to put things back in their proper place',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN7',
        type: 'rating',
        title: 'I like order',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN8',
        type: 'rating',
        title: 'I shirk my duties',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN9',
        type: 'rating',
        title: 'I follow a schedule',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'CSN10',
        type: 'rating',
        title: 'I am exacting in my work',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN1',
        type: 'rating',
        title: 'I have a rich vocabulary',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN2',
        type: 'rating',
        title: 'I have difficulty understanding abstract ideas',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN3',
        type: 'rating',
        title: 'I have a vivid imagination',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN4',
        type: 'rating',
        title: 'I am not interested in abstract ideas',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN5',
        type: 'rating',
        title: 'I have excellent ideas',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN6',
        type: 'rating',
        title: 'I do not have a good imagination',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN7',
        type: 'rating',
        title: 'I am quick to understand things',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN8',
        type: 'rating',
        title: 'I use difficult words',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN9',
        type: 'rating',
        title: 'I spend time reflecting on things',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      },
      {
        name: 'OPN10',
        type: 'rating',
        title: 'I am full of ideas',
        minRateDescription: 'Disagree',
        maxRateDescription: 'Agree',
        defaultValue: 0,
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' }
        ]
      }
    ]
  };
  const survey = new Model(surveyJson);

  survey.onComplete.add(async (sender) => {
    console.log(sender.data);
    const res = await axios.post(`personality-match`, sender.data);
    if (res.status == 200) {
      console.log(res.data);
    }
  });

  return (
    <div className='container'>
      <Survey model={survey}></Survey>
    </div>
  );
};

export default PersonalitySurveyForm;
