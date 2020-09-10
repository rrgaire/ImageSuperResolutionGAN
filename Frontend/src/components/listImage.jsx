import React from 'react';

const ListImage = ({ files }) => {
  console.log('ronast',files)
    return (
      <div>
        {files.map((f) => (
          <div key={f.name} className="list-image-box">
            <div className="two-cols-inside-list-box">
              <input
                type="checkbox"
                name="select-all"
                id="select-all"
                className="ckbox"
              />

              <div className="list-box-inner">
                <p className="m-0">Name: {f.name}</p>
                <p className="m-0">Size: {f.size}</p>
              </div>
            </div>
            <div className="two-cols-inside-list-box">
              <button type="button" className="scale-button">
                Scale
              </button>
              <div className="list-box-inner">
                <p className="m-0">Factor(x): </p>
                <p className="m-0">Size: </p>
              </div>
            </div>
            <div>
              <button type="button" className="remove-image-button">
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    );
}
 
export default ListImage;