import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, MarkerWithLabel } from "react-google-maps"

class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log(props.lat);
  }

  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    // this.setState({ isMarkerShown: false })
    // this.delayedShowMarker()
  }

  render() {
    const markers = [];

    console.log(this.props.positions);

    for (const [index, position] of this.props.positions.entries()) {
      markers.push(<Marker position={{ lat: position.lat, lng: position.lng }} onClick={this.props.onMarkerClick} />)
    }

    const MyMapComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAFO0lrruVQh81nQ5HLjtpMJDrvPeaUpwE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: this.props.height }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
        defaultOptions={{
          // defaultCenter: {lat: -34.397, lng: 150.644 },
          //disableDefaultUI: true,
          mapTypeId: 'terrain',
        }}
      >
        {markers}
      </GoogleMap>
    )

    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MapContainer;