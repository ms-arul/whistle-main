import logo from "../assets/whistle-logo.png";

export default function WhistleLogo({ size = 200 }) {
  return (
    <img
      src={logo}
      alt="Whistle Logo"
      width={size}
      height="auto"
      className="whistle-logo"
    />
  );
}
