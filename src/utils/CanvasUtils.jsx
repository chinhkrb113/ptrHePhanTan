import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';

let canvas = null;

export function initializeCanvas() {
    canvas = window._canvas = new fabric.Canvas('mockup_canvas');
    canvas.on('object:selected');
}

export function getCanvasInstance() {
    if (canvas == null) {
        initializeCanvas();
        return canvas;
    }
    return canvas;
}

export function setCanvasSize(width = 500, height = 500) {
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.isDrawingMode = true;
}
export function deleteObject() {
    canvas.remove(canvas.getActiveObject());
}

export function addShape(shape, fill, tagColor) {
    console.log('Got executed', 'FFFFFFF');
    switch (shape) {
        case 'rectangle': {
            canvas.add(
                new fabric.Rect({
                    width: 50,
                    height: 50,
                    left: 50,
                    top: 50,
                    fill: fill,
                    opacity: 1,
                    id: uniqid('rect-'),
                    name: 'Rectangle',
                    tagColor: tagColor,
                    flipX: false,
                    flipY: false,
                    stroke: 'black',
                    strokeWidth: 1,
                })
            );
            break;
        }
        case 'circle': {
            canvas.add(
                new fabric.Circle({
                    radius: 40,
                    left: 50,
                    top: 50,
                    fill: fill,
                    opacity: 1,
                    id: uniqid('circ-'),
                    name: 'Circle',
                    tagColor: tagColor,
                    flipX: false,
                    flipY: false,
                    stroke: 'black',
                    strokeWidth: 1,
                })
            );
            break;
        }
        default: {
            return 0;
        }
    }

    canvas.renderAll();
}

export function stopDraw() {
    canvas.isDrawingMode = false;
    canvas.renderAll();
}
export function draw(tagColor) {
    canvas.isDrawingMode = true;
    console.log(tagColor);
    // set color draw
    canvas.freeDrawingBrush.color = tagColor;

    canvas.renderAll();
}

export function addText(text, tagColor) {
    canvas.add(new fabric.Text(text, { left: 100, top: 100, fill: tagColor }));
    canvas.renderAll();
}

export function changeColor(color) {
    if (canvas.getActiveObject() != null) {
        canvas.isDrawingMode = false;

        canvas.getActiveObject().set('fill', color);
        canvas.renderAll();
    }
    return 0;
}
export function changeOpacity(opacity) {
    if (canvas.getActiveObject() != null) {
        canvas.getActiveObject().set('opacity', opacity);
        canvas.renderAll();
    }
    return 0;
}

const initializeFilter = (activeObj) => {
    if (activeObj) {
        activeObj.filters = [];
        activeObj.filters.push(new fabric.Image.filters.Blur({ blur: 0 }));
        activeObj.filters[0].value = 0;
        activeObj.filters.push(new fabric.Image.filters.Saturation({ saturation: 0 }));
        activeObj.filters[1].value = 0;
        activeObj.filters.push(new fabric.Image.filters.HueRotation({ rotation: 0 }));
        activeObj.filters[2].value = 0;
        activeObj.filters.push(
            new fabric.Image.filters.Brightness({
                brightness: 0,
            })
        );
        activeObj.filters[3].value = 0;
        activeObj.filters.push(new fabric.Image.filters.Contrast({ contrast: 0 }));
        activeObj.filters[4].value = 0;
        // activeObj.filters.push(new fabric.Image.filters.Grayscale({ grayscale: 0 }));
        // activeObj.filters[5].value = 0;

        activeObj.applyFilters();
    }
};

const createFilter = (activeObj, type) => {
    if (activeObj && activeObj.type === 'image') {
        activeObj.filters = [];
        if (type !== 'figure') {
            initializeFilter(activeObj);
            activeObj.filterPercentage = 100;
        }
    }
    canvas.requestRenderAll();
};

const getPercentage = (originalValue, percentage) => {
    const value = Math.round((originalValue * percentage) / 100);
    if (!value) {
        return 0;
    } else {
        return value;
    }
};

export const setFilter = (name, num, max) => {
    var activeObj = canvas.getActiveObject();
    console.log(activeObj.filters.length);
    if (activeObj.filters.length === 0) {
        createFilter(activeObj);
        return;
    }

    if (activeObj) {
        const percentage = 100;
        switch (name) {
            case 'blur':
                // activeObj.filters.splice(10, 1);
                activeObj.filters[0].blur = getPercentage(Number(num), percentage) / max;
                activeObj.filters[0].value = num;
                break;
            case 'saturate':
                activeObj.filters[1].saturation = getPercentage(Number(num), percentage) / max;
                activeObj.filters[1].value = num;
                break;
            case 'huerotate':
                activeObj.filters[2].rotation = getPercentage(Number(num), percentage) / max;
                activeObj.filters[2].value = num;
                break;
            case 'brightness':
                activeObj.filters[3].brightness = getPercentage(Number(num), percentage) / max;
                activeObj.filters[3].value = num;
                break;
            case 'contrast':
                activeObj.filters[4].contrast = getPercentage(Number(num), percentage) / max;
                activeObj.filters[4].value = num;
                break;

            // case 'grayscale':
            //     activeObj.filters[5].grayscale = getPercentage(Number(num), percentage) / max;
            //     activeObj.filters[5].value = num;
            //     break;
            default:
                break;
        }
        activeObj.applyFilters();
        canvas.requestRenderAll();
    }
};

export function applyFilter(filterType, value, unit = '') {
    console.log(canvas.getActiveObject());
    if (canvas.getActiveObject() != null) {
        let filter;
        switch (filterType) {
            case 'opacity':
                filter = new fabric.Image.filters.Alpha({
                    alpha: value + unit,
                });
                break;
            case 'blur':
                filter = new fabric.Image.filters.Blur({
                    blur: value + unit,
                });
                break;
            case 'brightness':
                filter = new fabric.Image.filters.Brightness({
                    brightness: value + unit,
                });
                break;
            case 'contrast':
                filter = new fabric.Image.filters.Contrast({
                    contrast: value + unit,
                });
                break;

            case 'grayscale':
                filter = new fabric.Image.filters.Grayscale({
                    grayscale: value + unit,
                });
                break;
            case 'sepia':
                filter = new fabric.Image.filters.Sepia({
                    sepia: value + unit,
                });
                break;
            case 'huerotate':
                filter = new fabric.Image.filters.HueRotation({
                    rotation: value + unit,
                });
                break;
            default:
                return;
        }

        console.log(filter[filterType]);
        let filterList = canvas.getActiveObject().filters.filter((item) => !item.hasOwnProperty(filterType));

        filterList.push(filter);
        console.log(filterList);

        canvas.getActiveObject().filters = filterList;
        canvas.getActiveObject().applyFilters();
        canvas.renderAll();
    }
}

export function addImage(dataURL) {
    fabric.Image.fromURL(dataURL, (img) => {
        // set width for image
        img.scaleToWidth(300);

        canvas.add(img);
        canvas.renderAll();
    });
}
export function generateImage() {
    return canvas.toDataURL({
        format: 'png',
    });
}

// export function sendObjectBackwards() {
//     if (canvas.getActiveObject() != null) {
//         canvas.sendBackwards(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
//     return 0;
// }

// export function sendObjectForwards() {
//     if (canvas.getActiveObject() != null) {
//         canvas.bringForward(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
// }
// export function bringObjectFront() {
//     if (canvas.getActiveObject() != null) {
//         canvas.bringToFront(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
//     return 0;
// }

// export function sendObjectBack() {
//     if (canvas.getActiveObject() != null) {
//         canvas.sendToBack(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
//     return 0;
// }

export function rotateObject(value) {
    const activeObject = canvas.getActiveObject();
    if (activeObject != null) {
        canvas.getActiveObject().rotate(value);
        canvas.renderAll();
    }
}
export function flipObject(direction) {
    const activeObject = canvas.getActiveObject();
    console.log('activeObject.flipY', activeObject.flipY);
    if (activeObject != null) {
        if (direction === 'X') {
            activeObject.flipX = !activeObject.flipX;
        }
    } else if (direction === 'Y') {
        activeObject.flipY = !activeObject.flipY;
    }
    canvas.renderAll();
}