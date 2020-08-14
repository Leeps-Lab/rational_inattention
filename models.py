import csv
import random
import math
from otree.api import (
    models,
    widgets,
    BaseConstants,
    BaseSubsession,
    BaseGroup,
    BasePlayer,
    Currency as c,
    currency_range,
)

author = 'Your name here'

doc = """
Your app description
"""

def parse_config(config):
    #reads straight from the config file constants
        with open('rational_inattention/configs/' + config, newline='') as config_file:
            rows = list(csv.DictReader(config_file))
            rounds = []
            for row in rows:
                rounds.append({
                    'round': int(row['round']) if row['round'] else 0,
                    'endowment': int(row['endowment']),
                    'initial_bonds': int(row['initial_bonds']),
                    'buy_option': True if row['buy_option'] == 'True' else False,
                    'sell_option': True if row['sell_option'] == 'True' else False,
                })
            # for i in range(1, num_rounds + 1):
            #     rounds.append({
            #         'g': int(random.uniform(0, 100)),
            #         'm': int(random.uniform(0, 100)),
            #         'y': int(random.uniform(0, 100)),
            #         'q': int(random.uniform(0, 100)),
            #     })
            # print('rounds', rounds)
            return rounds
    # script to create a csv document with uniformly generated values for each variable
        if(generate_random_vars):
            with open('rational_inattention/configs/session_config.csv', 'w', newline='') as csvfile:
                fieldnames = ['round', 'g' , 'm', 'y', 'q']
                writer = csv.writer(csvfile)
                writer.writeheader()
                for i in range(1 , num_rounds + 1):
                        writer.writerow(dict([
                        ('round', i),
                        ('g', int(random.uniform(0, 100))),
                        ('m', int(random.uniform(0, 100))),
                        ('y', int(random.uniform(0, 100))),
                        ('q', int(random.uniform(0, 100))),
                        ]))
        # reads from data.csv into lists
            with open('rational_inattention/configs/data.csv') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    g.append(int(row['g']))
                    m.append(int(row['m']))
                    y.append(int(row['y']))
                    q.append(int(row['q']))

class Constants(BaseConstants):
    name_in_url = 'rational_inattention'
    players_per_group = None
    # actual number from config file (TODO)
    num_rounds=2

    def get_round_number(self):
        return self.round_number

class Subsession(BaseSubsession):
    # initial values of fields for players for each subsession
    g = models.IntegerField(initial=int(random.uniform(0, 100)))
    m = models.IntegerField(initial=int(random.uniform(0, 100)))
    y = models.IntegerField(initial=int(random.uniform(0, 100)))
    q = models.IntegerField(initial=int(random.uniform(0, 100)))
    step = models.IntegerField(initial=0)
    is_default = models.BooleanField(initial=False)

    def creating_session(self):
        config = self.config
        if not config:
            return

    @property
    def config(self):
        try:
            return parse_config(self.session.config['config_file'])[self.round_number-1]
        except IndexError:
            return None
    
    def set_payoffs(self):
        groups = self.get_groups()
        print('groups', groups)
        for group in groups:
            group.set_payoffs()
class Group(BaseGroup):
    pass
class Player(BasePlayer):
    precision = models.IntegerField(initial=100)
    buy_price = models.FloatField(initial=0)
    sell_price = models.FloatField(initial=100)
    bought = models.BooleanField(initial=False)
    sold = models.BooleanField(initial=False)
    bond_payment = models.IntegerField(initial=100)
    num_bonds = models.IntegerField(initial=1)
    payoff = models.FloatField(initial=100)


def custom_export(players):
    # header row
    yield ['precision', 'buy_price', 'sell_price']
    for p in players:
        yield [p.precision, p.buy_price, p.sell_price]