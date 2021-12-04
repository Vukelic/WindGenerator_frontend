import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private apiURL;
  private dataUrl: string = '/assets/data/data.geojson';

  //Real Estates
  public fakedbRealEstates: any[] = [
    {
      "id": 1,
      "coordinates": [43.16224375443991, 22.58173690764003],
      "country": "Serbia",
      "city": "Pirot",
      "type": "Investment opportunity",
      "client": "AB Market",
      "shortName": "RP Pirot",
      "description": "Potential Retail Park with extension on remaining part of plot",
      "land": 55655,
      "buildingSize": 7300,
      "value": 9000000,
      "additionalInfo": "Part A, B, C and D with more details in GE",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image1.jpg" },
        { "source": "assets/gallery/gallery_image3.jpg" },
        { "source": "assets/gallery/gallery_image6.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" }
      ],
      "documents": [
        { "source": "Document.docx", "extension": "docx" },
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan1.png" },
        { "source": "assets/gallery/plan4.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 2,
      "coordinates": [44.84430709023277, 20.207378239879578],
      "country": "Serbia",
      "city": "Belgrade",
      "type": "Investment opportunity",
      "client": "Miroslav Micic",
      "shortName": "Dobanovci - Micic",
      "description": "Commercial plots",
      "land": 17800,
      "buildingSize": 0,
      "value": 0,
      "additionalInfo": "5 plots (3 owed by legal entity and 2 by private owner)",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Document.docx", "extension": "docx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 3,
      "coordinates": [44.8226408, 20.2413415],
      "country": "Serbia",
      "city": "Dobanovci",
      "type": "Investment opportunity",
      "client": "Alca Trgovina doo",
      "shortName": "Alca Warehouse",
      "description": "Office/ Warehouse buildings + Potential expansion to adjacent plots",
      "land": 17820,
      "buildingSize": 9079,
      "value": 0,
      "additionalInfo": "Extension potential 1 (26,307 sqm) and 2 (35,262 sqm) - asking price 20eur/sqm",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Excel.xlsx", "extension": "xlsx" },
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan3.png" },
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 4,
      "coordinates": [45.3027361, 19.8333635],
      "country": "Serbia",
      "city": "Novi Sad",
      "type": "Investment opportunity",
      "client": "AddikoBanka.d.Belgrade",
      "shortName": "Land Plot Novi Sad 2.06Ha",
      "description": "Construction land",
      "land": 20669,
      "buildingSize": 0,
      "value": 1150000,
      "additionalInfo": "Urban parameters: P+2+Pk, occupancy max.50%, coeficient 0,5–2.",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Document.docx", "extension": "docx" },
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan3.png" },
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 5,
      "coordinates": [44.9168806, 20.2554007],
      "country": "Serbia",
      "city": "Batajnica",
      "type": "Investment opportunity",
      "client": "NB Čelik d.o.o.",
      "shortName": "Land Plot Batajnica, 2.1Ha",
      "description": "Land Plot",
      "land": 21621,
      "buildingSize": 0,
      "value": 0,
      "additionalInfo": "Land plot is currently used as agricultural, but subject to conversion. Construction of commercial properties is allowed",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image1.jpg" },
        { "source": "assets/gallery/gallery_image3.jpg" },
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image6.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" }
      ],
      "documents": [
        { "source": "Excel.xlsx", "extension": "xlsx" },
        { "source": "Document.docx", "extension": "docx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan1.png" },
        { "source": "assets/gallery/plan4.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 6,
      "coordinates": [45.757546191262854, 19.134499761951073],
      "country": "Serbia",
      "city": "Sombor",
      "type": "Investment opportunity",
      "client": "Gucci",
      "shortName": "Land plot Sombor",
      "description": "Gucci Production Facility Sombor, Progetti doo",
      "land": 64000,
      "buildingSize": 9500,
      "value": 460000,
      "additionalInfo": "",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image1.jpg" },
        { "source": "assets/gallery/gallery_image3.jpg" },
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image6.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" }
      ],
      "documents": [
        { "source": "Document.docx", "extension": "docx" },
        { "source": "Excel.xlsx", "extension": "xlsx" },
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan1.png" },
        { "source": "assets/gallery/plan4.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 7,
      "coordinates": [45.5539898, 19.743973],
      "country": "Serbia",
      "city": "Srbobran",
      "type": "Investment opportunity",
      "client": "Private owner",
      "shortName": "Land Plot Srbobran 7.5 Ha",
      "description": "Land plots",
      "land": 75559,
      "buildingSize": 0,
      "value": 12,
      "additionalInfo": "5 cadastral plots CM Srbobran (9351/16,9351/17,9351/18,9351/19 and 9351/20)",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image1.jpg" },
        { "source": "assets/gallery/gallery_image3.jpg" },
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image6.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" }
      ],
      "documents": [
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan1.png" },
        { "source": "assets/gallery/plan4.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 8,
      "coordinates": [44.8489268, 20.1915334],
      "country": "Serbia",
      "city": "Ugrinovci",
      "type": "Investment opportunity",
      "client": "Private owners (2)",
      "shortName": "Land Plot Ugrinovci 2.5 Ha",
      "description": "Land Plot for sale",
      "land": 25174,
      "buildingSize": 0,
      "value": 0,
      "additionalInfo": "",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan3.png" },
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 9,
      "coordinates": [43.8748999, 20.354806],
      "country": "Serbia",
      "city": "Čačak",
      "type": "Investment opportunity",
      "client": "Republic of Serbia - Ex Military complex",
      "shortName": "Land Plot 1- 26Ha",
      "description": "Construction land",
      "land": 266306,
      "buildingSize": 0,
      "value": 6600000,
      "additionalInfo": "17 inscribed object, Utilities: water, sewage, electricity, Latest General regulation plan 2014/2017 : sport center, hospital, nursing home, greenery",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Document.docx", "extension": "docx" },
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan3.png" },
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 10,
      "coordinates": [43.8815067, 20.3703741],
      "country": "Serbia",
      "city": "Čačak",
      "type": "Investment opportunity",
      "client": "Private owner",
      "shortName": "Land Plot 2 - 2.8Ha",
      "description": "Land Plot with potential expansion to adjacent plots ( A i B)",
      "land": 28000,
      "buildingSize": 0,
      "value": 0,
      "additionalInfo": "Main plot size is 22,446 sqm and potential expansion ( A+B ) is 6,000sqm, potential expansion C is separated plot that can be used for pylon purposes",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Document.docx", "extension": "docx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan3.png" },
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 11,
      "coordinates": [44.82549926471988, 20.37230353493217],
      "country": "Serbia",
      "city": "Belgrade",
      "type": "Investment opportunity",
      "client": "RKB",
      "shortName": "RKB 27Ha",
      "description": "Office/ Warehouse buildings",
      "land": 274793,
      "buildingSize": 24350,
      "value": 0,
      "additionalInfo": "Cadastral parcel 492/1 (100% oved by RKB)",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Sheet.xlsx", "extension": "xlsx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan3.png" },
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    },
    {
      "id": 12,
      "coordinates": [44.8438127, 20.2780219],
      "country": "Serbia",
      "city": "Dobanovci",
      "type": "Investment opportunity",
      "client": "Fontes Group",
      "shortName": "Land Plot - Fontes Group 11.3Ha",
      "description": "Construction land",
      "land": 113800,
      "buildingSize": "30,000-150,000",
      "value": 0,
      "additionalInfo": "According to DRP there is an opportunity to construct 51% of object of business purpose and 49% of compatible purpose which may be: retail and wholesale, hotel industry and hospitality, sport, culture, science, development research and similar facilities.",
      "street": "",
      "images": [
        { "source": "assets/gallery/gallery_image4.jpg" },
        { "source": "assets/gallery/gallery_image7.jpg" },
        { "source": "assets/gallery/gallery_image8.jpg" }
      ],
      "documents": [
        { "source": "Document.docx", "extension": "docx" }
      ],
      "plans": [
        { "source": "assets/gallery/plan3.png" },
        { "source": "assets/gallery/plan5.png" },
        { "source": "assets/gallery/plan2.png" }
      ],
      "connectedProjects": []
    }
  ];
  //Projects
  public fakedbProjects: any[] = [
    {
      id: 1,
      project: 'Projekat Beograd',
      realEstates: [

      ]
    },
    {
      id: 2,
      project: 'Projekat Vojvodina',
      realEstates: [

      ]
    }
  ];

  public globalREList:any;
  public globalREListChange: Subject<any> = new Subject<any>();

  public globalProjectList = <any>[];
  public globalProjectListChange: Subject<any> = new Subject<any>();

  public globalREAllAddedNonFiltered = <any>[];

  constructor(private http: HttpClient, private matDialog: MatDialog) {
    this.apiURL = environment.apiURL;

    // RE[1] <-> Pr[0]
    this.fakedbRealEstates[1].connectedProjects.push(this.fakedbProjects[0]);
    this.fakedbProjects[0].realEstates.push(this.fakedbRealEstates[1]);
    // RE[10] <-> Pr[0]
    this.fakedbRealEstates[10].connectedProjects.push(this.fakedbProjects[0]);
    this.fakedbProjects[0].realEstates.push(this.fakedbRealEstates[10]);
    // RE[3] <-> Pr[1]
    this.fakedbRealEstates[3].connectedProjects.push(this.fakedbProjects[1]);
    this.fakedbProjects[1].realEstates.push(this.fakedbRealEstates[3]);

  }

  // REAL ESTATES

  getRealEstates(filters:any) {
    console.log('%cGetting RE list from service!', 'color: #c3e8e4');
    console.log(filters)

    let filteredList = <any>[];
    let tmpFilters:any;
    if (filters) {
      tmpFilters = {
        city: filters.city ? filters.city.toString().toLowerCase() : '',
        landFrom: filters.landFrom >= 0 ? filters.landFrom : null,
        landTo: filters.landFrom >= 0 ? filters.landTo : null,
        buildingSizeFrom: filters.buildingSizeFrom >= 0 ? filters.buildingSizeFrom : null,
        buildingSizeTo: filters.buildingSizeTo >= 0 ? filters.buildingSizeTo : null,
        valueFrom: filters.value >= 0 ? filters.valueFrom : null,
        valueTo: filters.value >= 0 ? filters.valueFrom : null,
        selectedProjectFilter: filters.selectedProjectFilter ? filters.selectedProjectFilter : null
      }
    }

    this.fakedbRealEstates.forEach(re => {
      filteredList.push(re);
    })

    console.log('filteredList PRE FILTER', filteredList);

    if (tmpFilters) {
      this.fakedbRealEstates.forEach(re => {
        if (tmpFilters.selectedProjectFilter) {
          if (re.connectedProjects.indexOf(tmpFilters.selectedProjectFilter) == -1) {
            this.removeREIfExist(filteredList, re);
          }
        }
        if (tmpFilters.city !== "") {
          if (!re.city.toString().toLowerCase().includes(tmpFilters.city)) {
            this.removeREIfExist(filteredList, re);
          }
        }

        if (tmpFilters.landFrom != null) {
          if (re.land < tmpFilters.landFrom) {
            this.removeREIfExist(filteredList, re);
          }
        }

        if (tmpFilters.landTo != null) {
          if (re.land > tmpFilters.landTo) {
            this.removeREIfExist(filteredList, re);
          }
        }

        if (tmpFilters.buildingSizeFrom != null) {
          if (re.buildingSize < tmpFilters.buildingSizeFrom) {
            this.removeREIfExist(filteredList, re);
          }
        }

        if (tmpFilters.buildingSizeTo != null) {
          if (re.buildingSize > tmpFilters.buildingSizeTo) {
            this.removeREIfExist(filteredList, re);
          }
        }

        if (tmpFilters.valueFrom != null) {
          if (re.value < tmpFilters.valueFrom) {
            this.removeREIfExist(filteredList, re);
          }
        }

        if (tmpFilters.valueTo != null) {
          if (re.value > tmpFilters.valueTo) {
            this.removeREIfExist(filteredList, re);
          }
        }
      })
    }

    console.log('filteredList POST FILTER', filteredList);


    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {
        observer.next(filteredList);
      }, 0);
    }).pipe(map(response => {
      return filteredList;
    }));
    return toRet;
  }


  removeREIfExist(reList: any[], re: any) {
    if (reList) {
      const index: number = reList.indexOf(re);
      if (index !== -1) {
        reList.splice(index, 1);
      }
    }
  }

  createRealEstate(realEstate:any) {
    this.fakedbRealEstates.forEach((element, index, arr) => {
      if (index === (arr.length - 1)) {
        realEstate.id = element.id + 1;
      }
    });

    this.fakedbRealEstates.push(realEstate);
    console.log('Creating new Real Estate', realEstate);
    console.log('New Real Estate list: ', this.fakedbRealEstates);


    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {

      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // let location = this.dataUrl;
    // return this.http
    //   .post<any>(location, {})
    //   .pipe(map(response => { }));
  }



  // PROJECTS

  getProjects() {
    console.log('%cGetting Project list from service!', 'color: #c3e8e4');
    // return this.fakedbProjects;
    let location = this.dataUrl;

    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {
        observer.next(this.fakedbProjects)
      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // return this.http
    //   .get<any>(location)
    //   .pipe(map(response => {
    //     return this.fakedbProjects;
    //   }));
  }

  createProject(project:any) {
    this.fakedbProjects.forEach((element, index, arr) => {
      if (index === (arr.length - 1)) {
        project.id = element.id + 1;
      }
    })

    this.fakedbProjects.push(project);
    console.log('Creating new Project', project);
    console.log('New Projects list: ', this.fakedbProjects);

    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {

      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // let location = this.dataUrl;
    // return this.http
    //   .post<any>(location, {})
    //   .pipe(map(response => { }));
  }

  updateProject(project:any, newName:any) {
    this.fakedbProjects.forEach(p => {
      if (p.id == project.id) {
        p.project = newName;
        // p.realEstates = newREList;
      }
    });

    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {

      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // let location = this.dataUrl;
    // return this.http
    //   .post<any>(location, {})
    //   .pipe(map(response => { }));
  }

  deleteProject(project:any) {
    this.fakedbProjects.forEach((element, index, arr) => {
      if (element.id == project.id) {
        arr.splice(index, 1);
      }
    });

    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {
        observer.next(project);
      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // let location = this.dataUrl;
    // return this.http
    //   .post<any>(location, {})
    //   .pipe(map(response => { }));
  }

  getProjectById(id:any) {
    let project:any;
    this.fakedbProjects.forEach((element, index, arr) => {
      if (element.id == id) {
        project = element;
      }
    });

    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {
        observer.next(project)
      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // let location = this.dataUrl;
    // return this.http
    //   .get<any>(location)
    //   .pipe(map(response => {
    //     return project;
    //   }));
  }

  deleteRealEstateFromProject(projectId:any, reId:any) {
    var prObject:any;
    var prInRealEstateListIndex = -1;
    var reObject = null;
    var reInConnectedProjectsIndex = -1;

    this.fakedbProjects.forEach((proj:any, indexPr:any, arrPr:any) => {
      if (proj.id == projectId) {
        prObject = proj;
        proj.realEstates.forEach((re:any, indexRe:any, arrRe:any) => {
          if (re.id == reId) {
            reObject = re;
            reInConnectedProjectsIndex = indexRe;
            re.connectedProjects.forEach((proj2:any, indexPr2:any, arrPr2:any) => {
              if (proj2.id == projectId) {
                prInRealEstateListIndex = indexPr2;
              }
            });
          }
        });
      }
    });

    if (prObject && prObject.realEstates && reInConnectedProjectsIndex !== -1) {
      prObject.realEstates.splice(reInConnectedProjectsIndex, 1);
      console.log('Successfuly removed RE from Project');
      console.log(this.fakedbProjects);
    }
    // if (reObject && reObject.connectedProjects && prInRealEstateListIndex !== -1) {
    //   reObject.connectedProjects.splice(prInRealEstateListIndex, 1);
    //   console.log('Successfuly removed Project from RE');
    //   console.log(this.fakedbRealEstates);
    // }

    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {
        observer.next()
      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // let location = this.dataUrl;
    // return this.http
    //   .get<any>(location)
    //   .pipe(map(response => {

    //   }));
  }


  addRealEstateToProject(project:any, realEstate:any) {

    if (project != null && project != undefined && realEstate != null && realEstate != undefined) {
      realEstate.connectedProjects.push(project);
      project.realEstates.push(realEstate);
      console.log(`%cSuccessfuly connected ` + realEstate.client + ` (RE) with ` + project.project + ` (Project)`, 'color: lime');
    }

    var toRet = new Observable<any[]>((observer) => {
      setTimeout(() => {
        observer.next()
      }, 0);
    }).pipe(map(response => response));
    return toRet;

    // let location = this.dataUrl;
    // return this.http
    //   .get<any>(location)
    //   .pipe(map(response => response));
  }



  updateRealEstatesGlobal(realEstates:any) {
    this.globalREList = realEstates;
    this.globalREListChange.next(this.globalREList);
  }

  updateProjectsGlobal(projects:any) {
    this.globalProjectList = projects;
    this.globalProjectListChange.next(this.globalProjectList);
  }


  getAdressFromCoords(lat:any, lng:any) {
    if (lat != undefined && lat != null && lng != null && lng != undefined) {
      let location = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=` + lat + `&lon=` + lng;
      return this.http
        .get<any>(location)
        .pipe(map(response => response));
    }
    return null;
  }

  getMapViewFromSearchTerm(city:any) {
    let location = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=` + city;
    return this.http
      .get<any>(location)
      .pipe(map(response => response));
  }

}
