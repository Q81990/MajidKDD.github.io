import lit_sdk
from lit_sdk import visualizers

# Define a custom visualizer for a red text box
class RedTextBoxVisualizer(visualizers.BaseVisualizer):
  def get_custom_style(self):
    # Return a dictionary of CSS styles
    return {'color': 'red', 'border': '1px solid black', 'padding': '10px'}

# Register the custom visualizer
visualizers.register(RedTextBoxVisualizer)

# Create a simple text box with the text "Hello, world!" in red
textbox = lit_sdk.widgets.TextBox(text='Hello, world!', visualizer=RedTextBoxVisualizer)

# Display the text box in LIT
lit_view = lit_sdk.LitView()
lit_view.set_widgets([textbox])
lit_view.display()
