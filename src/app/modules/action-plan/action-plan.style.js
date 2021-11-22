import styled from 'styled-components';

//did a change in actionplan header to have the css of underline in heading.
export const ActionPlanHeader = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 24px;
  color: #000000;
  text-decoration: underline;
`;

let filt = 2;

// const Card=(props)=>{
//   if(props.isFiltered){

//   }
// }

export const Card = styled.div`
  background: #ecf0f3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  filter: ${(props) => (props.isFiltered ? 'blur(0px)' : 'blur(3px)')};
`;
export const CardTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #384e63;
`;

export const Duration = styled.span`
  font-weight: 300;
  font-size: 16px;
  font-style: italic;
  line-height: 21px;
  letter-spacing: 0.04em;
`;
