import { TestBed, } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContentfulService } from './contentful.service';
import { Results } from './results';
import { Project } from './project';

describe('ContentfulService', () => {
  let service: ContentfulService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContentfulService);
  });

  it('should get the list of projects', () => {
    const response = {
      "sys": {
        "type": "Array"
      },
      "total": 2,
      "skip": 0,
      "limit": 100,
      "items": [
        {
          "fields": {
            "name": "Open Timesheets",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam laudantium, excepturi doloremque autem delectus exercitationem! Numquam, quisquam! Exercitationem vero labore ratione, fugit est nam molestias eos suscipit sint dolor deleniti.",
            "repository": "https://github.com/valerymelou/opentimesheet-frontend",
            "demo": "https://github.com/valerymelou/opentimesheet-frontend",
            "preview": {
              "sys": {
                "type": "Link",
                "linkType": "Asset",
                "id": "5FDFzSrTV09o3IRDZGtjTF"
              }
            }
          }
        },
        {
          "metadata": {
            "tags": [
              {
                "sys": {
                  "type": "Link",
                  "linkType": "Tag",
                  "id": "django"
                }
              },
              {
                "sys": {
                  "type": "Link",
                  "linkType": "Tag",
                  "id": "python"
                }
              }
            ]
          },
          "fields": {
            "name": "Django Active Link",
            "description": "The best way to highlight active links in your Django project. Available on PyPi.",
            "repository": "https://github.com/valerymelou/django-active-link",
            "preview": {
              "sys": {
                "type": "Link",
                "linkType": "Asset",
                "id": "6EaXyC58O6ROPMWDNlzJ3A"
              }
            }
          }
        }
      ],
      "includes": {
        "Asset": [
          {
            "metadata": {
              "tags": []
            },
            "sys": {
              "id": "5FDFzSrTV09o3IRDZGtjTF",
              "type": "Asset",
            },
            "fields": {
              "title": "Screenshot Open Timesheet",
              "description": "",
              "file": {
                "url": "//images.ctfassets.net/gq9ultyr0moo/5FDFzSrTV09o3IRDZGtjTF/69772ee0467c77f200eaa1a0c1c38a86/Screenshot_2022-02-23_193800.png",
                "details": {
                  "size": 499291,
                  "image": {
                    "width": 1401,
                    "height": 838
                  }
                },
              }
            }
          },
          {
            "metadata": {
              "tags": []
            },
            "sys": {
              "id": "6EaXyC58O6ROPMWDNlzJ3A",
              "type": "Asset",
            },
            "fields": {
              "title": "Picture of code in Visual Studio Code",
              "description": "",
              "file": {
                "url": "//images.ctfassets.net/gq9ultyr0moo/6EaXyC58O6ROPMWDNlzJ3A/f9d50a716afa8256232868dc8bf47cc8/Screenshot_2022-02-22_215821.png",
                "details": {
                  "size": 188252,
                  "image": {
                    "width": 1920,
                    "height": 1034
                  }
                },
              }
            }
          }
        ]
      }
    };
    service.getProjects().subscribe((projects: Results<Project>) => {
      expect(projects.items.length).toBe(2);
      expect(projects.items[0].name).toBe('Open Timesheets');
      expect(projects.items[0].description).toBe('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam laudantium, excepturi doloremque autem delectus exercitationem! Numquam, quisquam! Exercitationem vero labore ratione, fugit est nam molestias eos suscipit sint dolor deleniti.');
      expect(projects.items[0].repository).toBe('https://github.com/valerymelou/opentimesheet-frontend');
      expect(projects.items[0].demo).toBe('https://github.com/valerymelou/opentimesheet-frontend');
      expect(projects.items[0].preview.url).toBeDefined();
      expect(projects.items[0].preview.title).toBe('Screenshot Open Timesheet');
      expect(projects.items[0].preview.description).toBe('');
    });

    const req = httpTestingController.expectOne('https://cdn.contentful.com/spaces/gq9ultyr0moo/environments/master/entries?content_type=project');
    expect(req.request.method).toBe('GET');

    req.flush(response);
    httpTestingController.verify();
  });
});
