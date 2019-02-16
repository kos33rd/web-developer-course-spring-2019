import React from "react";
import ReactDOM from "react-dom";

import { MySecondComponent } from "./my-second-component"

const colors = [
    'red',
    'blue',
    'yellow'
]

ReactDOM.render(
    <div>
        {colors.map((color, idx) =>
            <MySecondComponent
                initialCount={idx + 100}
                key={color}
                color={color}
            />
        )}
    </div>,
    document.getElementById('app')
);
