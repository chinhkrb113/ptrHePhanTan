import React, { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as canvasUtils from '../../utils/CanvasUtils.jsx';
import TextInputModal from '../common/textInputModal';

const CreateShape = () => {

    const currentObjectInfo = useSelector(state => state.objectInfo.objectInfo);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {}, [currentObjectInfo.tagColor]);
    const handleClick = (shape) => {
        console.log(currentObjectInfo.tagColor);
        canvasUtils.addShape(shape, currentObjectInfo.fill, currentObjectInfo.tagColor);
    };
    const toggleTextInputModal = () => {
        setIsOpen(!isOpen);
    };
    const handleTextInput = (text) => {
        console.log('Text', text);
        canvasUtils.addText(text, currentObjectInfo.tagColor);
    };
    const handleClickStopDraw = () => {
        canvasUtils.stopDraw();
    }
    const handleClickDraw = () => {
        canvasUtils.draw(currentObjectInfo.tagColor);
    }

    const handleClickDelete = () => {
        canvasUtils.deleteObject();
    }

    return (
        <div className="column">
            <TextInputModal show={isOpen} onClose={() => toggleTextInputModal()} onSaveChanges={(text) => handleTextInput(text)} />
            <div className="icon-btn-container">
                <button className="button is-primary tooltip" data-tooltip="Add Square" onClick={() => handleClick('rectangle')}>
                    hình vuông
                    {' '}
                    <i className="icon-square" />{' '}
                </button>
                <button className="button is-primary tooltip" data-tooltip="Add Circle" onClick={() => handleClick('circle')}>
                    {' '}
                    hình tròn
                    <i className="icon-circle" />
                </button>
                <button className="button is-primary tooltip" data-tooltip="Add Text" onClick={() => toggleTextInputModal()}>
                    {' '}
                    add text
                    <i className="icon-text" />
                </button>
                <button className="button is-primary tooltip" data-tooltip="Add Text" onClick={() => handleClickDelete()}>
                    {' '}
                    xóa
                    <i className="icon-text" />
                </button>
                <button className="button is-primary tooltip" data-tooltip="Add Text" onClick={() => handleClickStopDraw()}>
                    {' '}
                    ngừng vẽ
                    <i className="icon-text" />
                </button>
                <button className="button is-primary tooltip" data-tooltip="Add Text" onClick={() => handleClickDraw()}>
                    {' '}
                    vẽ tiếp
                    <i className="icon-text" />
                </button>
            </div>
        </div>
    );
};

export default CreateShape;