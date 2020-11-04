import React from "react";
import { Link } from "react-router-dom";

export const Logo = (props) => {
  const { image, alt, className, classImg } = props;
  return (
    <figure className={className}>
      <img className={classImg} src={image} alt={alt} />
    </figure>
  );
};

export const ButtonLink = (props) => {
  const { path, className, children } = props;
  return (
    <Link to={path} className={className}>
      {children}
    </Link>
  );
};

export const GoToButton = (props) => {
  const { path, className, children } = props;

  return (
    <Link to={path} className={className}>
      {children}
    </Link>
  );
};

export const Image = (props) => {
  const { className, imgClass } = props;
  const { src, alt } = props;
  //Render nothing if not src
  if (!src) return null;
  return (
    <figure className={className}>
      <img className={imgClass} src={src} alt={alt} />
    </figure>
  );
};

export const InfoItem = (props) => {
  const { text, textClass, iconClass, iconContent, className } = props;
  return (
    <div className={className}>
      <span className={iconClass}>
        <i className={iconContent} aria-hidden="true"></i>
      </span>
      <span className={textClass}>{text}</span>
    </div>
  );
};

export const SearchProduct = (props) => {
  const { value, handleChange, resetInput } = props;
  return (
    <div className="field has-addons">
      <div className="control" style={{ width: "100%" }}>
        <input
          className="input is-warning is-medium"
          type="text"
          placeholder="Qué buscas?"
          onChange={handleChange}
          value={value}
        />
      </div>
      <div className="control">
        <button className="button is-warning is-medium" onClick={resetInput}>
          <span className="icon is-large">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export const CustomField = ({ field, form: { touched, errors }, ...props }) => (
  <div className="field">
    {props.label ? (
      <label className="label is-large">{props.label}</label>
    ) : null}
    <div className="control">
      {props.type === "textarea" ? (
        <textarea
          type="text"
          className="input is-medium form-comment"
          {...field}
          {...props}
        ></textarea>
      ) : (
        <input type="text" className="input is-medium" {...field} {...props} />
      )}
    </div>
    {touched[field.name] && errors[field.name] ? (
      <p className="help is-danger">{errors[field.name]}</p>
    ) : null}
  </div>
);

export const SocialNetworkIcon = ({ src, className, classIcon, target }) => {
  return (
    <a href={src} className={className} target={target}>
      <i className={classIcon}></i>
    </a>
  );
};

export const CustomSelect = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <div className="field">
    {props.label ? (
      <label className="label is-large">{props.label}</label>
    ) : null}
    <div className="control">
      <div className="select is-medium fullwidth">
        <select className="fullwidth" {...field} {...props}>
          {props.children}
        </select>
      </div>
    </div>
    {touched[field.name] && errors[field.name] ? (
      <p className="help is-danger">{errors[field.name]}</p>
    ) : null}
  </div>
);

export const CheckEdit = (props) => (
  <span 
    className="icon is-small has-text-success"
    onClick={props.onClick}>
    <i className="fa fa-check"></i>
  </span>
)

export const CancelEdit = (props) => (
  <span 
    className="icon is-small has-text-danger"
    onClick={props.onClick}>
    <i className="fa fa-times"></i>
  </span>
)

export const AllowEdit = (props) => (
  <span 
    className="icon is-small has-text-info"
    onClick={props.onClick}>
    <i className="fas fa-edit"></i>
  </span>
)

export const LoadingIcon = (props) => (
  <span 
    className="icon is-small has-text-info">
    <i className="fas fa-spinner fa-pulse"></i>
  </span>
)

export const LogoutButton = ({className="", onClick}) => (
  <div className={`field ${className}`}>
    <p className="control">
      <button
        type="button"
        className="button is-danger"
        onClick={onClick}
      >
        <strong>Salir</strong>
      </button>
    </p>
  </div>
)

export const Loader = () => {
  return (
    <figure className="image is-128x128">
      <img src="/images/pizza-loading.gif" alt="Loading ..."/>
    </figure>
  )
}