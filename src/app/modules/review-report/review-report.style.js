import styled from 'styled-components';

export const Header = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 45px;
  color: #000000;
`;

export const ProfileWrapper = styled.div`
  margin-top: -11% !important;
  background: #384e63;
  border-radius: 50%;
  @media (max-width: 540px) {
    margin-left: auto !important;
    margin-right: auto !important;
  }
`;
export const ProfileImage = styled.img`
  width: 152px;
  height: 152px;
`;

export const RoundedTop = styled.div`
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  background: #384e63 !important;
  min-height: 120px !important;
  padding-left: 200px !important;
  color: white;
`;
export const RoundedBottom = styled.div`
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  background: #fff !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 120px !important;
`;

export const Card = styled.div`
  height: 100%;
  width: 50%;
  position: absolute;
  right: 0;
  top: 0;
`;
export const CardRow = styled.div`
  overflow: hidden;
  position: relative;
`;

export const CardHeader = styled.div`
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
  background-color: transparent;
  border-top-right-radius: 10px !important;
  border-top-left-radius: 10px !important;
  color: black;
  border-bottom: 0px !important;
`;
export const Badge = styled.li`
  border: 1px solid #4a667b;
  border-radius: 15px;
  padding: 5px 10px;
  font-family: 'Poppins', 'Roboto', sans-serif !important;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
`;

export const Mx15px = styled.div`
  margin-left: 15px;
  margin-right: 15px;
`;

export const CarouselDiv = styled.div`
  .p-carousel-indicator button.p-link {
    width: 8px;
    border-radius: 50%;
  }
`;
