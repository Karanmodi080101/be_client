import React, { useState } from 'react';
import axios from 'axios';
import { Survey, Model, StylesManager } from 'survey-react';
import 'survey-react/defaultV2.css';

StylesManager.applyTheme('defaultV2');

const SurveyComponent = (props) => {
  const [attritionResult, setAttrtionResult] = useState({
    Most_important_features: []
  });
  const [showAttritionResult, setShowAttrtionResult] = useState(false);

  const surveyJson = {
    elements: [
      {
        name: 'Age',
        type: 'text',
        inputType: 'number',
        title: 'How old are you?',
        isRequired: true
      },
      {
        name: 'NumCompaniesWorked',
        type: 'text',
        inputType: 'number',
        title: 'Numbers of companies you have worked in?',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 50
          }
        ]
      },
      {
        name: 'TotalWorkingYears',
        type: 'text',
        inputType: 'number',
        title: 'Total years of work experience?',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 50
          }
        ]
      },
      {
        name: 'Gender',
        type: 'radiogroup',
        title: 'Gender?',
        isRequired: true,
        colCount: 2,
        choices: ['Male', 'Female']
      },
      {
        name: 'JobRole',
        type: 'radiogroup',
        title: 'What is your Job Role?',
        isRequired: true,
        colCount: 1,
        choices: ['Worker', 'Emloyee', 'Manager level', 'HR']
      },
      {
        name: 'Department',
        type: 'radiogroup',
        title: 'In which deparement do you work?',
        isRequired: true,
        colCount: 1,
        choices: ['Research & Development', 'Sales', 'Human Resources']
      },
      {
        name: 'JobInvolvement',
        type: 'rating',
        title: 'How much are you involved in meetings?',
        isRequired: true,
        minRateDescription: 'Not Involved',
        maxRateDescription: 'Completely Involved',
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' }
        ]
      },
      {
        name: 'MaritalStatus',
        type: 'radiogroup',
        title: 'Marital Status?',
        isRequired: true,
        colCount: 2,
        choices: ['Married', 'Single', 'Divorced']
      },
      {
        name: 'RelationshipSatisfaction',
        type: 'rating',
        title: 'Rate the relationship with your manager?',
        isRequired: true,
        minRateDescription: 'Bad',
        maxRateDescription: 'Good',
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' }
        ]
      },
      {
        name: 'StockOptionLevel',
        type: 'rating',
        title:
          'how are you satisfied with companies benefit/stocks and offers?',
        isRequired: true,
        minRateDescription: 'Not Satisfied',
        maxRateDescription: 'Satisfied',
        rateValues: [
          { value: 0, text: '0' },
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' }
        ]
      },
      {
        name: 'EnvironmentSatisfaction',
        type: 'rating',
        title: 'how are you satisfied with work environment?',
        isRequired: true,
        minRateDescription: 'Not Satisfied',
        maxRateDescription: 'Satisfied',
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' }
        ]
      },
      {
        name: 'OverTime',
        type: 'radiogroup',
        title: 'Do you overtime?',
        isRequired: true,
        colCount: 2,
        choices: ['Yes', 'No']
      },
      {
        name: 'PercentSalaryHike',
        type: 'text',
        inputType: 'number',
        title: 'Percentage Salary Hike?',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 100
          }
        ]
      },
      {
        name: 'YearSinceLastPromotion',
        type: 'text',
        inputType: 'number',
        title: 'Years since last promotion?',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 15
          }
        ]
      },
      {
        name: 'WorkLifeBalance',
        type: 'rating',
        title: 'Rate your work-life balance?',
        isRequired: true,
        minRateDescription: 'Bad',
        maxRateDescription: 'Good',
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' }
        ]
      },
      {
        name: 'JobSatisfaction',
        type: 'rating',
        title: 'Rate your JobSatisfaction?',
        isRequired: true,
        minRateDescription: 'Bad',
        maxRateDescription: 'Good',
        rateValues: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' }
        ]
      },
      {
        name: 'YearsInCurrentRole',
        type: 'text',
        inputType: 'number',
        title: 'Number of companies worked in current role?',
        isRequired: true
      },
      {
        name: 'YearsAtCompany',
        type: 'text',
        inputType: 'number',
        title: 'Number of years you have worked in current company?',
        isRequired: true
      },
      {
        name: 'TrainingTimeLastYear',
        type: 'text',
        inputType: 'number',
        title: 'Number of months you have been trained in last year?',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 12
          }
        ]
      },
      {
        name: 'PerformanceRating',
        type: 'rating',
        title: 'How do you rate your performance last year?',
        isRequired: true,
        rateValues: [
          { value: 1, text: 'Low' },
          { value: 2, text: 'Good' },
          { value: 3, text: 'Excellent' },
          { value: 4, text: 'Outstanding' }
        ]
      },
      {
        name: 'BusinessTravel',
        type: 'radiogroup',
        title: 'How Often You Business travel?',
        isRequired: true,
        colCount: 3,
        choices: [
          'Non-Travel|Non Travel',
          'Travel_Rearly|Rearly',
          'Travel_Frequently|Frequently'
        ]
      },
      {
        name: 'EducationField',
        type: 'radiogroup',
        title: 'To Which Educational Field do you belong?',
        isRequired: true,
        colCount: 3,
        choices: [
          'Life Sciences',
          'Medical Science',
          'Marketing',
          'Technical Degree',
          'Other'
        ]
      },
      {
        name: 'YearsWithCurrManager',
        type: 'text',
        inputType: 'number',
        title: 'Years with current manager?',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 30
          }
        ]
      },
      {
        name: 'JobLevel',
        type: 'radiogroup',
        title: 'What is your Job level?',
        isRequired: true,
        colCount: 1,
        choices: [
          { value: 1, text: 'Entry-level' },
          { value: 2, text: 'Intermediate or experienced (senior staff)' },
          { value: 3, text: 'First-level management' },
          { value: 4, text: 'Middle management' },
          { value: 5, text: 'Executive or senior management' }
        ]
      },
      {
        name: 'MonthlyIncome',
        type: 'text',
        inputType: 'number',
        title: 'Where does your monthl salary lie?',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 200000
          }
        ]
      },
      {
        name: 'Education',
        type: 'radiogroup',
        title: 'Educational level(bachler/masters/PHD/student)?',
        isRequired: true,
        colCount: 1,
        choices: [
          { value: 1, text: 'Below College' },
          { value: 2, text: 'College' },
          { value: 3, text: 'Bachelor' },
          { value: 4, text: 'Master' },
          { value: 5, text: 'Doctor' }
        ]
      },
      {
        name: 'DistanceFromHome',
        type: 'text',
        inputType: 'number',
        title:
          'what is distance of your workplace from your from home? (in miles)',
        isRequired: true,
        validators: [
          {
            type: 'numeric',
            minValue: 0,
            maxValue: 1000
          }
        ]
      }
    ]
  };
  const survey = new Model(surveyJson);

  survey.onComplete.add(async (sender) => {
    const modifiedData = {
      ...sender.data,
      DailyRate: 802,
      HourlyRate: 65,
      MonthlyRate: 14313
    };
    const res = await axios.post(`employee-attrition`, modifiedData);
    if (res.status == 200) {
      setShowAttrtionResult(true);
      setAttrtionResult(res.data.data);
    }
  });

  return (
    <div className='container'>
      {showAttritionResult ? (
        <div className='text-center'>
          <h2>Attrition: {attritionResult.Attrition}</h2>
          <h3>
            Probability of Staying: {attritionResult.Probability_of_staying}
          </h3>
          <h3>
            Probability of Leaving: {attritionResult.Probability_of_leaving}
          </h3>
          <h4>Most Important Features</h4>
          <ul>
            {attritionResult.Most_important_features.map((r) => {
              return (
                <li>
                  <h5>{r}</h5>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <Survey model={survey}></Survey>
      )}
    </div>
  );
};

export default SurveyComponent;
