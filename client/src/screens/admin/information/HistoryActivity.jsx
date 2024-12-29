import styled from 'styled-components'

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  h3{
    font-size: 2.2rem;
    color: #187bce;
    margin-bottom: 30px;    
  }
  .content{
    margin-bottom: 30px;
    padding: 10px;
    font-size: 1.8rem;
    border-bottom: 2px solid #ddd;
    h4{
      font-size: 2rem;
      color: #898989;
    }
  }
`;

const UserActivity = ({ profile }) => {
  return (
    <ActivityContainer>
      <h3>Operation History</h3>
      {profile.activities.map((activity) => (
        <>
          <div className="content">
            <h4>{activity.action}</h4>
            <p>{activity.time}</p>
          </div>
        </>
      ))}
    </ActivityContainer>
  );
};

export default UserActivity;
