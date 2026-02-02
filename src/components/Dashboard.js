import React, { memo, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { useGetSettingsQuery } from '../features/centerSlice';

function Dashboard() {
    const dispatch = useDispatch()
    const {data, isSuccess } = useGetSettingsQuery();

    useEffect(()=> {
        if( isSuccess && data?.settings ) {
            dispatch({ type:"SETTINGS", payload: data.settings })
        }
    },[]);

    return (
    <>
        <div className="container">
            <div className="d-grid" style={{placeItems:'center',height:'82vh'}}>
                <div className="d-flex w-100 " style={{justifySelf:'center', placeContent:'center'}}>
                    <div className="col-md-6">
                        shuru karo
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default memo(Dashboard)