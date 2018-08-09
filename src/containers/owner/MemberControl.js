import React, { Component } from 'react'
import { apiCall } from '../../services/api';
import PropTypes from 'prop-types';
import SimpleAccordion from '../../components/views/SimpleAccordion';
import { convertZone, formatDate } from '../../services/date';

// const BanRequestsPanel = props => {

//     return (
//         <React.Fragment>
//             {mapBanRequestsDataToAccordions()}
//         </React.Fragment>
//     )
// }

// BanRequestsPanel.propTypes = {
//     banRequests: PropTypes.array.isRequired
// }


class MemberControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            banRequests: []
        }
    }

    mapBanRequestsDataToAccordions = () => {
        const { banRequests } = this.state;
        return banRequests.map(banRequest => {
            return {
                id: banRequest._id,
                title: `Ban Request for ${banRequest.member.username} by ${banRequest.requestedBy.adminName}`,
                content: [
                    `Reason: ${banRequest.reason}`,
                    `!!Requested on ${formatDate(convertZone(banRequest.createdAt))}`
                ]
            }
        });
    }

    render() {
        const { banRequests } = this.state;

        return (
            <React.Fragment>
                <section id="section-header">
                    <h1></h1>
                </section>
                <section id="section-requests">
                    {banRequests.length > 0 &&
                            <SimpleAccordion
                            datas={this.mapBanRequestsDataToAccordions()}
                        />}
                </section>
            </React.Fragment>
        )
    }

    componentDidMount() {
        // Get ban requests from API
        apiCall('get', `/api/ban/getbanrequests`)
            .then(banRequests => {
                this.setState({ ...this.state, banRequests: banRequests })
            })
            .catch(err => err);
    }
}

export default MemberControl;