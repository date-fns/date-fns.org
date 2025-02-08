import { h } from "preact";
import "./style.spinner.css"
export default function LoadingSpinner() {
    return (
      <div className="loader-container">
        <div className="loader">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="loader-dot" />
          ))}
        </div>
      </div>
    )
  }
  
  