import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }
//ViewContainerRef          : Dinamik olarak yüklenecek componenti içerisinde barındıran container'dır. (Her dinamik yükleme sürecinde önceki view'leri clear etmemiz gerekmektedir.)
  //ComponentFactory : COmponent'lerin instance'larını oluşturmak için kullanılan nesnedir.
  //ComponentFactoryResolver : Belirli bir component için ComponentFactory'i resolve eden sınıftır. İçerisindeki resolveComponentFactory fonksiyonu aracılığıyla ilgili componente dair bir ComponentFactory nesnesi oluşturup, döner.
  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;

    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component)
  }
}

export enum ComponentType {
  BasketsComponent
}
