import { Link } from 'react-router-dom';

import single from '../../resourses/img/single.svg';
import multiple from '../../resourses/img/multiple.svg';

import './create.scss';

const Create = () => {
    return (
        <div className="create">
            <div className="container">
                <div className="create__inner">
                    <div className="create__flexbox">
                        <div className="create__inner-title">Create collectible</div>
                        <div className="create__inner-subtitle">Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one collectible multiple times</div>
                        <div className="create__group">
                            <Link to="/create/single" className="create__group-item">
                                <div className="card__img">
                                    <img className="card" src={single} alt=""/>
                                </div>
                                <div className="create__group-title">Single</div>
                            </Link>
                            <Link to="/create/multiple" className="create__group-item">
                                <div className="card__img card__img--green">
                                    <img className="card" src={multiple} alt=""/>
                                </div>
                                <div className="create__group-title create__group-title--green">Multiple</div>
                            </Link>
                        </div>
                        <div className="create__inner-subtitle">We do not own your private keys and cannot access your funds without your confirmation</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;