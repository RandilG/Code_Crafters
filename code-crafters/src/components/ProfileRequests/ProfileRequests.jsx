import React from "react";
import ViewComponent from "../ViewComponent/ViewComponent"; // Assuming ProfileRequest is in the same directory

const ProfileRequests = () => {
  return (
    <div>
      <center>
        <h1>Job Posters Requests</h1>
        <ViewComponent
          requestDataUrl="http://localhost:8000/jobposterrequests"
          acceptUrl="http://localhost:8000/acceptrequest"
          declineUrl="http://localhost:8000/declinerequest"
          successAcceptMessage="Job Poster Request accepted successfully"
          successDeclineMessage="Job Poster Request declined successfully"
          failureMessage="Failed to process request"
          acceptButtonName="Accept"
          declineButtonName="Decline"
          modelname="Job Poster Details"
        />
      </center>
    </div>
  );
};

export default ProfileRequests;
