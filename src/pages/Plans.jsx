import styled from 'styled-components';
import PlanningStampTour from '../features/plans/PlanningStampTour';

const StyledPlan = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
`;

const StyledLayout = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export default function Plans() {
  return (
    <StyledPlan>
      <StyledLayout>
        <PlanningStampTour />
      </StyledLayout>
    </StyledPlan>
  );
}
