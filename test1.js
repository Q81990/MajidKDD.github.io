"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require();
var visualizers = ;
var RedTextBoxVisualizer = /** @class */ (function () {
    function RedTextBoxVisualizer() {
    }
    return RedTextBoxVisualizer;
}());
(visualizers.BaseVisualizer);
def;
get_custom_style(self);
return { 'color': 'red', 'border': '1px solid black', 'padding': '10px' };
visualizers.register(RedTextBoxVisualizer);
textbox = module_1.default.widgets.TextBox(text = 'Hello, world!', visualizer = RedTextBoxVisualizer);
lit_view = module_1.default.LitView();
lit_view.set_widgets([textbox]);
lit_view.display();
