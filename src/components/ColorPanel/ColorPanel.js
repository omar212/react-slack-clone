import React from 'react';
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react';

class ColorPanel extends React.Component {
  //Creates a thin black planel on the side
  render(){
    return(
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
        >
          <Divider />
         <Button icon="add" style={{marginBottom: '25px'}} size="small" color="blue" />
         <Button icon="play" style={{marginBottom: '25px'}} size="small" color="blue" />
         <Button icon="video" style={{marginBottom: '25px'}} size="small" color="blue" />
         <Button icon="paper plane" style={{marginBottom: '25px'}} size="small" color="blue" />
         <Button icon="calendar alternate outline" style={{marginBottom: '25px'}} size="small" color="blue" />
         <Button icon="font" style={{marginBottom: '25px'}} size="small" color="blue" />
        </Sidebar>
    );
  }
}

export default ColorPanel;
