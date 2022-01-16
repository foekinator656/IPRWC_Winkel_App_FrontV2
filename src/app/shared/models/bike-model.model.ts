export class BikeModel {
  public bikeModelId: number;
  public bikeModelName: string;
  public priceOfTheDay: number;
  public minStockCount: number;
  public photoUrl: string;

  constructor(bikeModelId: number, bikeModelName: string, priceOfTheDay: number, minStockCount: number, photoUrl: string) {
    this.bikeModelId = bikeModelId;
    this.bikeModelName = bikeModelName;
    this.priceOfTheDay = priceOfTheDay;
    this.minStockCount = minStockCount;
    this.photoUrl = photoUrl;
  }
}
