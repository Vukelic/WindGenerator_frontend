import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoWindGeneratorDevice } from "../WindGeneratorDevice/DtoWindGeneratorDevice";

export class DtoWindGeneratorType extends ARepoBaseEntity{

    Name: string;
    Description: string;
    Turbines: string;
    Guarantee: string;
    HeightOfWing: string;
    ImageUrl: String;
    MaxPowerTurbine: string;
    MaxSpeedTurbine: string;
    PowerOfTurbines: string;
    Weight: string;
    WidthOfWing: string;
    GeneratorPower: string;

    //COMPLEX PROPERTIES
   ListOfGenerators?: DtoWindGeneratorDevice[];

   //local
   File?: any;
   Angular_FullUrl?: any;

   /**
    *
    */
   constructor() {
    super();
     
    this.Name = "";
    this.Description = "";
    this.Turbines = "";
    this.Guarantee = "";
    this.HeightOfWing = "";
    this.ImageUrl = "";
    this.MaxPowerTurbine = "";
    this.MaxSpeedTurbine = "";
    this.PowerOfTurbines = "";
    this.Weight = "";
    this.WidthOfWing = "";
    this.GeneratorPower = "";
   }

}