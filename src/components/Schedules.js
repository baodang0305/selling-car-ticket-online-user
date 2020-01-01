import React from "react";
import {Table, Button} from "react-bootstrap";
import "../styles/App.css";
import userActions from "../actions/user";
import { connect } from "react-redux";
import history from "../helpers/history";

class Schedules extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(departure, destination){
        history.push("/schedules-detail", {departure, destination});
    }

    componentWillMount(){
        const {getAllRoutes} = this.props;
        getAllRoutes();
    }
    
    render(){

        const {routes} = this.props;
        let listRoute;

        if(routes){
            routes.map((route, i) => 
                listRoute = 
                <tr>
                    <td>{i + 1}</td>
                    <td>{route.departure}</td>
                    <td>{route.destination}</td>
                    <td>{route.typeOfCar}</td>
                    <td>{route.distance}</td>
                    <td>{route.departureTime.length}</td>
                    <td>{route.fare}</td>
                    <td><Button onClick={() => this.handleClick(route.departure, route.destination)} variant="outline-success"><i class="fas fa-clock"></i></Button></td>
                    <td></td>
                    <td><Button variant="success">Mua Vé</Button></td>
                </tr>
            )
        }

        return (
            <div className="container mt-5">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <h4 className="text-warning"> Tuyến Đường <i class="fas fa-shuttle-van"></i></h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-success font-weight-bold">Tên Tuyến Đường &nbsp; <i class=" fas fa-exchange-alt"></i></div>
                        <Table responsive="sm">
                            <thead>
                                <tr className="">
                                    <th>STT</th>
                                    <th>Bến đi</th>
                                    <th>Bến đến</th>
                                    <th>Loại xe</th>
                                    <th>Quảng Đường</th>
                                    <th>Số chuyến/ngày</th>
                                    <th>Giá vé</th>
                                    <th>Giờ chạy</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listRoute}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    routes: state.getAllRoutes.routes
})
const actionCreators = {
    getAllRoutes: userActions.getAllRoutes
}

export default connect(mapStateToProps, actionCreators)(Schedules);