//3rd Party Modules
import React, { useContext, useState } from 'react';

//Local Modules
import Card from '../../shared/Components/UIElements/Card';
import Button from '../../shared/Components/FormElements/Button/Button.js'
import Modal from '../../shared/Components/UIElements/Modal';
import Map from '../../shared/Components/UIElements/Map';
import AuthContext from '../../shared/Context/auth-context';
import { useHttpClient } from '../../shared/util/useHttpClient';
import LoadingSpinner from '../../shared/Components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/Components/UIElements/ErrorModal';

//CSS Files
import './PlaceItem.css'


function PlaceItem (props){
    const [showMap, setShowMap] = useState(false);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    
    const openMapModal = () => setShowMap(true);
    const closeMapModal = () => setShowMap(false);

    const showDeleteConfirmationModal = () => setDeleteConfirmationModal(true);
    const closeDeleteConfirmationModal = () => setDeleteConfirmationModal(false);

    const auth = useContext(AuthContext); 

    const {isLoading, error, clearError, sendRequest} = useHttpClient();

    const confirmedDeleteHandler = async () => {

        setDeleteConfirmationModal(false);
            try{
                // const response = 
                await sendRequest({
                    api:`/api/places/${props.id}`,
                    headers:{
                        'Content-Type':"application/json ; charset=UTF-8", 
                        Authorization:'Bearer '+ auth.token                   
                    },
                    method:'DELETE'

                });
            
                props.onDelete(props.id);
            }
            catch(err){
                
            }
    };
        
    return <>
    {error && <ErrorModal onClear={clearError} error={error}/>}
    <Modal 
        show={showMap} 
        onCancel={closeMapModal}
        header={props.address}
        footer={<Button onClick={closeMapModal}>CLOSE</Button>}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
    >
    <div className='map-container'>
        <Map center={props.coordinates} zoom="16"/>
    </div>
    </Modal>
    <Modal 
        show={deleteConfirmationModal} 
        onCancel={closeDeleteConfirmationModal}
        header="Are You Sure?"
        footer={
        <>
        <Button inverse onClick={closeDeleteConfirmationModal}>CANCEL</Button>
        <Button danger onClick={confirmedDeleteHandler}>DELETE</Button>
        </>
        }
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
    >
        Do you want to proceed and delete this {props.title} place? Please note that it can't be undone thereafter. 
    </Modal>
    <li className='place-item'> 
    <Card className='place-item__content'> 

    {isLoading && <div className='center'> <LoadingSpinner asOverlay/> </div>}
        <div className='place-item__image'>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`} alt={props.title}/>
        </div>
        <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className='place-item__actions'>
            <Button inverse onClick={openMapModal}>VIEW ON MAP </Button>
            {(auth.userId===props.creator) && 
            <Button to={`/places/${props.id}`}>EDIT</Button>
            }{(auth.userId===props.creator) && 
            <Button danger onClick={showDeleteConfirmationModal}>DELETE</Button>
            }
        </div>
    </Card>
    </li>
    </>
}
export default PlaceItem;