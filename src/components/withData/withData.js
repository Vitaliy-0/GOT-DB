import React, {Component} from 'react';
import Spinner from '../spinner';
import GotService from '../../services/gotService';
import ItemList from '../itemList';

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null
        }
    
        componentDidMount() {
            getData()
                .then( (data) => {
                    this.setState({data});
                    console.log(data);
                })
        }

        render() {
            const {data} = this.state;
            if(!data) {
                return <Spinner/>
            }
            
            return <View {...this.props} data={data}/>
        }
    }
}
const {getAllCharacters} = new GotService();
export default withData(ItemList, getAllCharacters);