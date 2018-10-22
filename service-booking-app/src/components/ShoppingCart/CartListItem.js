import React from "react";

const CartListItem = props => {
  const { data, isPriceVisible, isDeletable, onClickRemoveBtn } = props;

  return (
    <div className="list__item">
      <h4 className={isDeletable ? "bold" : "semi-bold"}>{data.Name}</h4>
      <h4 className={isDeletable ? "bold" : "semi-bold"}>
        {isPriceVisible && "$" + data.Price}
      </h4>
      {isDeletable && (
        <a
          className="remove-btn"
          onClick={() => onClickRemoveBtn(data.ServiceCode)}
        >
          <span className="icon-cancel blue" />
        </a>
      )}
      {data.Description && (
        <p className="item__desc text-tiny">{data.Description}</p>
      )}
    </div>
  );
};

export default CartListItem;
