import { Injectable } from '@angular/core';


@Injectable()
export class UrlService {
  private mainUrl = '';
  constructor() {}

  setMainUrl(url) {
    this.mainUrl = url;
  }

  getMainUrl(){
    return this.mainUrl;
  }

}
