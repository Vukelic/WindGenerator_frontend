import { ARepoBaseEntity } from "../Common/ARepoBaseEntity";
import { DtoWindGeneratorDevice } from "../WindGeneratorDevice/DtoWindGeneratorDevice";

export class DtoWindGeneratorType extends ARepoBaseEntity{

    Name: string;
    Description: string;
    Turbines: number;
    Guarantee: number;
    HeightOfWing: string;
    ImageUrl: String;
    MaxPowerTurbine: string;
    MaxSpeedTurbine: string;
    PowerOfTurbines: string;
    Weight: string;
    WidthOfWing: string;

    //COMPLEX PROPERTIES
   ListOfGenerators: DtoWindGeneratorDevice[];

}