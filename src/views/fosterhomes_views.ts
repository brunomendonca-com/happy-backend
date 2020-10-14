import FosterHome from "../models/FosterHome";
import imagesView from "./images_view";

export default {
  render(fosterhome: FosterHome) {
    return {
      id: fosterhome.id,
      name: fosterhome.name,
      latitude: fosterhome.latitude,
      longitude: fosterhome.longitude,
      about: fosterhome.about,
      instructions: fosterhome.instructions,
      opening_hours: fosterhome.opening_hours,
      open_on_weekends: fosterhome.open_on_weekends,
      images: imagesView.renderMany(fosterhome.images)
    }
  },

  renderMany(fosterhomes: FosterHome[]) {
    return fosterhomes.map(fosterhome => this.render(fosterhome));
  }
}