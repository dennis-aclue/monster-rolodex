import { Component } from 'react';
import Card from '../card/card.component';

import './card-list.styles.css';

class CardList extends Component {
    render() {
        console.log(this.props.monsters);
        const { monsters } = this.props;

        return (
            <div
                id='card-list' 
                className='card-list'>
                {monsters.map(monster => {
                    return (
                        <Card monster={monster}
                        />
                    );
                })}
            </div>
        );
    }
}

export default CardList;
