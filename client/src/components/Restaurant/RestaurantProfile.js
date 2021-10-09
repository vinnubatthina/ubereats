import React, { Component } from 'react';
import '../../css/Generic.css';
import { getRestaurantProfile, saveRestaurantProfile } from '../../services/RestaurantService';
import RestaurantNavBar from './RestaurantNavBar';

export default class RestaurantProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantName: '',
            location: '',
            description: '',
            cuisine : '',
            timings: '',
            emailId: '',
            phone: '',
            street: '',
            state: '',
            country: '',
            pincode: '',
            isDeliveryChecked: false,
            isPickupChecked: false,
            saveMessege: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        let deliveryType = [];

        if(this.state.isDeliveryChecked){
            deliveryType.push("DELIVERY");
        }
        if(this.state.isPickupChecked){
            deliveryType.push("PICKUP");
        }

        const restaurantProfile = {
            restaurantName: this.state.restaurantName,
            location: this.state.location,
            description: this.state.description,
            cuisine : this.state.cuisine,
            timings: this.state.timings,
            emailId: this.state.emailId,
            phone: this.state.phone,
            deliveryType : String(deliveryType),
            street: this.state.street,
            state: this.state.state,
            country: this.state.country,
            pincode: parseInt(this.state.pincode)
        };
        const response = await saveRestaurantProfile(restaurantProfile);
        if (response === 200) {
            this.setState({
                saveMessege: false
            })
            document.getElementById('save_messege').innerHTML = "Successfully Saved your Profile !!!";
        }
        else {

        }

    }

    async componentDidMount() {
        let emailId = 'default@default.com';
        try {
            emailId = localStorage.getItem('emailId');
        }
        catch (error) {
            console.log(error);
        }
        const request = {
            emailId: emailId
        }
        const restaurantProfile = await getRestaurantProfile(request);
        if (restaurantProfile) {
            let isDeliveryChecked = false;
            let isPickupChecked = false;
            if(restaurantProfile.delivery_type){
                let delivery_types = restaurantProfile.delivery_type.split(",");
                delivery_types.map((type)=>{
                    if(type === "DELIVERY"){
                        isDeliveryChecked = true;
                    }
                    else{
                        isPickupChecked = true;
                    }
                })
            }

            this.setState({
                restaurantName: restaurantProfile.store_name,
                location: restaurantProfile.store_location,
                description: (restaurantProfile.description) ? restaurantProfile.description : '',
                cuisine : (restaurantProfile.cuisine) ? restaurantProfile.cuisine : '',
                timings: (restaurantProfile.timings) ? restaurantProfile.timings : '',
                emailId: localStorage.getItem('emailId'),
                isDeliveryChecked : isDeliveryChecked,
                isPickupChecked : isPickupChecked,
                phone: (restaurantProfile.phone) ? restaurantProfile.phone : '',
                street: (restaurantProfile.street) ? restaurantProfile.street : '',
                state: (restaurantProfile.state) ? restaurantProfile.state : '',
                country: (restaurantProfile.country) ? restaurantProfile.country : '',
                pincode: (restaurantProfile.pincode) ? restaurantProfile.pincode : ''
            })
            console.log(this.setState);
        }
    }

    render() {
        return (
            <div>
                <RestaurantNavBar />
                <form style={{ marginLeft: '3%' }}>
                    <div className="form-group center_div">
                        <label htmlFor="formGroupExampleInput">Restaurant Name</label>
                        <input type="text" className="form-control" value={this.state.restaurantName} onChange={(e) => this.setState({ restaurantName: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Location</label>
                        <input type="text" className="form-control" value={this.state.location} onChange={(e) => this.setState({ location: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Description</label>
                        <textarea className="form-control" rows="3" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Cuisine</label>
                        <input type="text" className="form-control" value={this.state.cuisine} onChange={(e) => this.setState({ cuisine: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Timings</label>
                        <input type="text" className="form-control" value={this.state.timings} onChange={(e) => this.setState({ timings: e.target.value })} />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Type of Delivery</label>
                        <br/>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="Delivery" checked={this.state.isDeliveryChecked} onChange={ () => {this.setState({isDeliveryChecked: !this.state.isDeliveryChecked})}}/>
                            <label class="form-check-label" for="inlineCheckbox1">Delivery</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="Pickup" checked={this.state.isPickupChecked} onChange={ () => {this.setState({isPickupChecked : !this.state.isPickupChecked})}}/>
                            <label class="form-check-label" for="inlineCheckbox2">Pickup</label>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Address</label>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Street" value={this.state.street} onChange={(e) => this.setState({ street: e.target.value })} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="State" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Country" value={this.state.country} onChange={(e) => this.setState({ country: e.target.value })} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <input type="number" className="form-control" placeholder="Pincode" value={this.state.pincode} onChange={(e) => this.setState({ pincode: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Contact Information</label>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" value={localStorage.getItem('emailId')} readOnly />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Phone Number" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-1">
                            <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div id="save_messege" hidden={this.state.saveMessege} style={{ marginTop: '1%' }}></div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}