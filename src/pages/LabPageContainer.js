import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import LabPage from "./LabPage";
import {
    decreaseCountAutoSubmitting,
    setCountAutoSubmitting, toggleCompleteTheWork,
    toggleIsAutoSubmitting, toggleIsCancelAutoSubmitting,
    toggleIsSubmitting
} from "../redux/lab-reducer";

class LabPageContainer extends React.Component {
    // const {user} = React.useState(FirebaseContext);
    componentDidMount() {
        // let userId = this.props.match.params.userId;
        // if (!userId) {
        //     // debugger;
        //     userId = this.props.authorizedUserId;
        //     if (!userId) {
        //         this.props.history.push("/login");
        //     }
        // }
        // this.props.getProfile(userId);
        // this.props.getStatus(userId);
    }

    render() {
        return <LabPage {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        // profile: state.profilePage.profile,
        // status: state.profilePage.status,
        // isAuth: state.auth.isAuth,
        isSubmitting: state.lab.isSubmitting,
        isAutoSubmitting: state.lab.isAutoSubmitting,
        countAutoSubmitting: state.lab.countAutoSubmitting,
        isCancelAutoSubmitting: state.lab.isCancelAutoSubmitting,
        isCompleteTheWork: state.lab.isCompleteTheWork,
    }
}

export default compose(
    connect(mapStateToProps,
        {
            toggleIsSubmitting,
            setCountAutoSubmitting,
            toggleIsAutoSubmitting,
            decreaseCountAutoSubmitting,
            toggleIsCancelAutoSubmitting,
            toggleCompleteTheWork,
        }),
    withRouter
)(LabPageContainer);