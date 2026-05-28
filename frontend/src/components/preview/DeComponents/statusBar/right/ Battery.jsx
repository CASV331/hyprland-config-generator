import { StatusItem } from "../shared/StatusItem";
import { BarIcon } from "../shared/BarIcon";

export function Battery({ textColor }) {
    return (
        <StatusItem>
            <BarIcon>
                <svg className="w-full h-full" fill={`${textColor}`} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" d="M384,-2.84217094e-14 L384,74.666 L426.666667,74.6666667 L426.666667,181.333333 L384,181.333 L384,256 L-2.13162821e-14,256 L-2.13162821e-14,-2.84217094e-14 L384,-2.84217094e-14 Z M341.333333,42.6666667 L42.6666667,42.6666667 L42.6666667,213.333333 L341.333333,213.333333 L341.333333,42.6666667 Z M320,64 L320,192 L64,192 L64,64 L320,64 Z" transform="translate(42.667 128)"></path></g></svg>
                <span>10%</span>
            </BarIcon>
        </StatusItem>
    )
}