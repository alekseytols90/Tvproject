import json
from pprint import pprint
from time import sleep
from time import time
import requests
from justwatch import JustWatch


def collect():
    # TVGUIDE_URL = 'https://mobilelistings.tvguide.com/Listingsweb/ws/rest/schedules/80001.null/start/{0}/duration/120?ChannelFields=Name%2CFullName%2CNumber%2CSourceId&ScheduleFields=ProgramId%2CEndTime%2CStartTime%2CTitle%2CAiringAttrib%2CCatId&formattype=json&disableChannels=music%2Cppv%2C24hr'.format(str(time()).split('.')[0])
    TVGUIDE_URL = 'https://mobilelistings.tvguide.com/Listingsweb/ws/rest/schedules/85061.null/start/{0}/duration/120?ChannelFields=Name%2CFullName%2CNumber%2CSourceId&ScheduleFields=ProgramId%2CEndTime%2CStartTime%2CTitle%2CAiringAttrib%2CCatId&formattype=json&disableChannels=music%2Cppv%2C24hr'.format(str(time()).split('.')[0])
    REELGOOD_URL = 'http://api-public.guidebox.com/v2'

    API_KEY = '52d6d050081c616a35b3c69e74da4baccbd61258'

    # init JustWatch API
    just_watch = JustWatch(country='US')
    provider_details = just_watch.get_providers()

    response = requests.get(TVGUIDE_URL)

    # check each channel for movies
    movies = []
    for channel in response.json():
        for program in channel['ProgramSchedules']:
            # check if there is title and category ID (1 for movies)
            if set(('Title', 'CatId')).issubset(program):
                # check if program is a movie
                if program['CatId'] == 1:
                    movie = {}
                    movie['channel'] = channel['Channel']['FullName'].encode('utf-8').decode()
                    movie['title'] = program['Title']
                    movie['start_time'] = program['StartTime']
                    movie['end_time'] = program['EndTime']

                    # get data from Reelgood API based on movie title
                    # TODO: get reelgood API key!
                    # response = requests.get(REELGOOD_URL + '/search',
                    #                         params={'api_key': API_KEY,
                    #                                 'type': 'movie',
                    #                                 'field': 'title',
                    #                                 'query': program['Title']})
                    # try:
                    #     id = response.json()['results'][0]['id']
                    #     response = requests.get(REELGOOD_URL + '/movies/' + str(id),
                    #                             params={'api_key': API_KEY})
                    #     movie['reelgood_web_url'] = response.json()['tv_everywhere_web_sources'][0]['link']
                    # except:
                    #     movie['reelgood_web_url'] = None
                    movie['reelgood_web_url'] = None

                    # get data from JustWatchAPI based on movie title
                    try:
                        results = just_watch.search_for_item(query=program['Title'])
                        movie['just_watch_web_url'] = results['items'][0]['offers'][0]['urls']['standard_web']
                        movie['poster'] = 'images.justwatch.com' + results['items'][0]['poster'].format(profile='s718')
                        movie['year'] = results['items'][0]['original_release_year']
                        movie['offers'] = []
                        offers = results['items'][0]['offers']
                        for offer in offers:
                            provider = next(item for item in provider_details if item['id'] == offer['provider_id'])
                            movie_offer = None
                            try:
                                movie_offer = {
                                    'provider_icon': 'images.justwatch.com' + provider['icon_url'].format(profile='s100'),
                                    'provider': provider['clear_name'],
                                    'url': offer['urls']['standard_web']
                                }
                            except:
                                pass
                            if movie_offer:
                                movie['offers'].append(movie_offer)
                        movie['offers'] = [dict(t) for t in {tuple(d.items()) for d in movie['offers']}]
                    except:
                        movie['just_watch_web_url'] = None
                        movie['offers'] = []
                        movie['poster'] = None
                    pprint(movie)
                    movies.append(movie)
                    print('\n')
                    sleep(3)
            else:
                for key, value in program.items():
                    print('key error: ' + key)

    with open('movies.json', 'w') as json_file:
        json.dump(movies, json_file, indent=4)


if __name__ == '__main__':
    collect()
