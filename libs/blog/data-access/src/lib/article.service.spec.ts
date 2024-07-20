import { TestBed } from '@angular/core/testing';

import { EntryCollection, EntrySkeletonType } from 'contentful';
import { of } from 'rxjs';

import { ContentfulService } from '@valerymelou/cms/contentful';

import { Results } from './results';
import { Article } from './article';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  const entries: EntryCollection<EntrySkeletonType, undefined, string> = {
    total: 1,
    skip: 0,
    limit: 10,
    items: [
      {
        metadata: {
          tags: [
            {
              sys: {
                type: 'Link',
                linkType: 'Tag',
                id: 'django',
              },
            },
            {
              sys: {
                type: 'Link',
                linkType: 'Tag',
                id: 'python',
              },
            },
          ],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'space',
            },
          },
          id: '5q42lmaU5qOIb9Uv6UO1LU',
          type: 'Entry',
          createdAt: '2023-07-16T12:43:45.844Z',
          updatedAt: '2023-07-16T18:54:23.261Z',
          environment: {
            sys: {
              id: 'staging',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'article',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title:
            'The Django administration site: One of the reasons why I love Django',
          slug: 'the-django-administration-site-one-of-the-reasons-why-i-love-django',
          cover: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'space',
                },
              },
              id: '1CbZoQHRwcvjlPwOukHm5G',
              type: 'Asset',
              createdAt: '2023-07-16T12:42:00.324Z',
              updatedAt: '2023-07-16T12:42:00.324Z',
              environment: {
                sys: {
                  id: 'staging',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'django-admin',
              description: '',
              file: {
                url: '//images.ctfassets.net/gq9ultyr0moo/1CbZoQHRwcvjlPwOukHm5G/92cdc9bd7b088aeab143d470cd045ec9/django-admin.png',
                details: {
                  size: 17512,
                  image: {
                    width: 1200,
                    height: 630,
                  },
                },
                fileName: 'django-admin.png',
                contentType: 'image/png',
              },
            },
          },
          abstract:
            'My developer friends call me “Django boy”. This is because, whenever we have to start working on a new project, I consider Django first.',
          content: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'The Django administration',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-2',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Before trying Django back in 2015, I had used only PHP frameworks like Symfony, Laravel and Codeigniter. One difficulty I had with those was to populate my database so that I could test the interfaces in the early stages of the project. They didn’t provide a way to do that in a graphical user interface. So one had to insert and update data in the database using raw SQL queries or fixtures. Later on, they had some third party projects like Sonata Admin for Symfony that allowed you to add an administration site to your project. But yes, you had to install additional packages in your project and spend a lot of time configuring them.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'With Django, it wasn’t the case and it is still not the case. The project that is generated by the command ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'code',
                      },
                    ],
                    value: 'django-admin startproject',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ' will create for you a project with the Django administration site already configured and ready to use. All you have to do is create your model just as usual, and then register them in the admin.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Let’s take an example. To follow along, you will need to have Python and Django installed on your computer. You also need to have some basic understanding of programming as this is not a tutorial on Django nor the Django administration site. We are going to create a project, add a model and register that model with Django admin so that we can populate the table represented by the model from the admin interface.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {
                  target: {
                    metadata: {
                      tags: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: 'Link',
                          linkType: 'Space',
                          id: 'space',
                        },
                      },
                      id: '3EObbivEB3UYiKJ4u8a158',
                      type: 'Entry',
                      createdAt: '2023-07-16T12:44:52.271Z',
                      updatedAt: '2023-07-16T12:44:52.271Z',
                      environment: {
                        sys: {
                          id: 'staging',
                          type: 'Link',
                          linkType: 'Environment',
                        },
                      },
                      revision: 1,
                      contentType: {
                        sys: {
                          type: 'Link',
                          linkType: 'ContentType',
                          id: 'githubGist',
                        },
                      },
                      locale: 'en-US',
                    },
                    fields: {
                      name: 'Rest parameter',
                      url: 'https://gist.github.com/valerymelou/1829e21bc03e7a6809b3530c7a9562dc',
                    },
                  },
                },
                content: [],
                nodeType: 'embedded-entry-block',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Creating a model',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-3',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "A Django project is made of applications which are just ways to isolate functionalities in modules. Every model needs to be part of an application. So let's create the application that will contain our model. Change your directory to the one containing your project files (",
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'code',
                      },
                    ],
                    value: 'website',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value: ' in my case) and run the command bellow:',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [
                      {
                        type: 'code',
                      },
                    ],
                    value: '> python manage.py startapp blog',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
        },
      },
    ],
    includes: {
      Asset: [
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'space',
              },
            },
            id: '1CbZoQHRwcvjlPwOukHm5G',
            type: 'Asset',
            createdAt: '2023-07-16T12:42:00.324Z',
            updatedAt: '2023-07-16T12:42:00.324Z',
            environment: {
              sys: {
                id: 'staging',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'django-admin',
            description: '',
            file: {
              url: '//images.ctfassets.net/gq9ultyr0moo/1CbZoQHRwcvjlPwOukHm5G/92cdc9bd7b088aeab143d470cd045ec9/django-admin.png',
              details: {
                size: 17512,
                image: {
                  width: 1200,
                  height: 630,
                },
              },
              fileName: 'django-admin.png',
              contentType: 'image/png',
            },
          },
        },
      ],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ContentfulService,
          useValue: { getEntries: () => of(entries) },
        },
      ],
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get article entries', () => {
    service.get({}).subscribe((articles: Results<Article>) => {
      expect(articles.items.length === 1);
    });
  });

  it('should get one article entry', () => {
    service
      .getOne(
        'the-django-administration-site-one-of-the-reasons-why-i-love-django',
      )
      .subscribe((article: Article) => {
        expect(
          article.title ===
            'The Django administration site: One of the reasons why I love Django',
        );
      });
  });
});
